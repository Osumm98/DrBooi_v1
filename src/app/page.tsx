import { HeroScene } from "@/components/scenes/HeroScene";
import { InsideScene } from "@/components/scenes/InsideScene";
import { ProcedureScene } from "@/components/scenes/ProcedureScene";
import { ConsultationScene } from "@/components/scenes/ConsultationScene";
import { ScrollPrompt } from "@/components/ScrollPrompt";
import { Biography } from "@/components/sections/Biography";
import { FieldsOfPractice } from "@/components/sections/FieldsOfPractice";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocateUs } from "@/components/sections/LocateUs";
import { SITE_URL, locations, practice } from "@/lib/practice";

// Structured data so Google/AI understand the practice and each consulting site.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: practice.name,
  medicalSpecialty: "Vascular",
  url: SITE_URL,
  email: practice.email,
  description:
    "Certified vascular surgeon in Johannesburg specialising in arterial and venous disorders, endovascular procedures, vascular trauma and dialysis access.",
  areaServed: "Gauteng, South Africa",
  availableService: [
    { "@type": "MedicalProcedure", name: "Arterial and venous vascular treatment" },
    { "@type": "MedicalProcedure", name: "Endovascular surgery" },
    { "@type": "MedicalProcedure", name: "Vascular trauma intervention" },
    { "@type": "MedicalProcedure", name: "Dialysis access creation and revision" },
  ],
  location: locations.map((loc) => ({
    "@type": "MedicalClinic",
    name: loc.name,
    telephone: loc.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.province,
      postalCode: loc.postalCode,
      addressCountry: "ZA",
    },
  })),
};

export default function Home() {
  return (
    <main className="relative w-full bg-background selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Crawlable summary. The scenes render as canvas images, so this gives
          search engines and screen readers real, indexable text. */}
      <section className="sr-only">
        <h1>Dr. Zuko Booi — Vascular Surgeon in Johannesburg</h1>
        <p>
          Dr. Zuko Booi is a certified vascular surgeon consulting at {locations[0].name} in
          Soweto, {locations[1].name} in Sandton, and {locations[2].name} in Krugersdorp. He
          diagnoses and treats arterial and venous vascular conditions, performs open and
          minimally invasive endovascular procedures, manages vascular trauma, and creates and
          revises dialysis access for patients with chronic kidney disease.
        </p>
      </section>

      <ScrollPrompt />
      <HeroScene />
      <InsideScene />
      <ProcedureScene />
      <Biography />
      <FieldsOfPractice />
      <FAQSection />
      <LocateUs />
      <ConsultationScene />
    </main>
  );
}
