"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, CalendarCheck, AlertCircle, ShieldCheck } from "lucide-react";
import { locations } from "@/lib/practice";
import type { BookingData } from "./BookingEngine";

interface ReviewStepProps {
  data: BookingData;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewStep({ data, onNext, onBack }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = locations.find((l) => l.slug === data.locationSlug);

  const summary: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Location", location ? `${location.name}, ${location.city}` : "—"],
    [
      "Date",
      data.date?.toLocaleDateString("en-ZA", {
        weekday: "short",
        day: "numeric",
        month: "long",
      }) ?? "—",
    ],
    ["Time", data.timeSlot ?? "—"],
    ...(data.medicalAid ? ([["Medical aid", data.medicalAid]] as [string, string][]) : []),
    ...(data.reason ? ([["Reason", data.reason]] as [string, string][]) : []),
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationSlug: data.locationSlug,
          date: data.date?.toISOString(),
          timeSlot: data.timeSlot,
          name: data.name,
          email: data.email,
          phone: data.phone,
          reason: data.reason,
          medicalAid: data.medicalAid,
          consent: data.consent,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setError(payload.error ?? "Something went wrong. Please try again.");
        return;
      }
      onNext();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 flex flex-col h-full"
    >
      <div>
        <h3 className="text-2xl font-heading font-semibold flex items-center gap-3 text-white">
          <CalendarCheck className="w-6 h-6 text-primary" />
          Review your request
        </h3>
        <p className="text-white/60 font-sans mt-2 text-sm">
          No payment is taken online. Consultation fees are settled at the rooms or via your
          medical aid.
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
          {summary.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4 px-5 py-3">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest pt-0.5">
                {k}
              </span>
              <span className="text-sm text-white text-right font-sans">{v}</span>
            </div>
          ))}
        </div>

        <p className="flex items-center gap-2 text-xs text-white/50">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          Sent securely to Dr. Booi&apos;s rooms. This is a request — the practice will confirm
          your slot.
        </p>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-white">
            <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-auto pt-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="w-14 h-14 shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-primary text-white font-heading font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-80 transition-all cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            "Submit request"
          )}
        </button>
      </div>
    </motion.div>
  );
}
