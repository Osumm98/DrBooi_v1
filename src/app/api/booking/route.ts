import { NextResponse } from "next/server";
import { locations, practice } from "@/lib/practice";

// Booking requests are consultation *requests*, not payments.
// The handler validates the payload and emails the practice via Resend.
// Required env: RESEND_API_KEY. Optional: BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL.

type BookingPayload = {
  locationSlug?: string;
  date?: string;
  timeSlot?: string;
  name?: string;
  email?: string;
  phone?: string;
  reason?: string;
  medicalAid?: string;
  consent?: boolean;
};

const escapeHtml = (s: string) =>
  s.replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export async function POST(request: Request) {
  let body: BookingPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const reason = (body.reason ?? "").trim();
  const medicalAid = (body.medicalAid ?? "").trim();
  const location = locations.find((l) => l.slug === body.locationSlug);

  // Server-side validation — never trust the client.
  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("email");
  if (phone.replace(/\D/g, "").length < 9) errors.push("phone");
  if (!location) errors.push("location");
  if (!body.date) errors.push("date");
  if (!body.timeSlot) errors.push("timeSlot");
  if (body.consent !== true) errors.push("consent");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: errors },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL || practice.email;
  const from = process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    // Fail loudly rather than pretend success (the old flow's mistake).
    console.error("[booking] RESEND_API_KEY is not set — cannot deliver request.");
    return NextResponse.json(
      { error: "Booking is temporarily unavailable. Please call the rooms directly." },
      { status: 503 }
    );
  }

  const preferredDate = new Date(body.date!).toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const rows: [string, string][] = [
    ["Patient", name],
    ["Email", email],
    ["Phone", phone],
    ["Preferred location", `${location!.name}, ${location!.city}`],
    ["Preferred date", preferredDate],
    ["Preferred time", body.timeSlot!],
    ["Medical aid", medicalAid || "Not provided"],
    ["Reason for visit", reason || "Not provided"],
  ];

  const html = `
    <h2>New consultation request</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:600">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="color:#666;font-size:12px">Sent from booipractice.co.za. This is a request only — please contact the patient to confirm.</p>
  `;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Booi Practice Bookings <${from}>`,
        to: [to],
        reply_to: email,
        subject: `Consultation request — ${name} (${location!.city})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[booking] Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "We could not submit your request. Please call the rooms directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[booking] Network error:", err);
    return NextResponse.json(
      { error: "We could not submit your request. Please call the rooms directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
