import type { Metadata } from "next";
import { HeroScene } from "@/components/scenes/HeroScene";
import { InsideScene } from "@/components/scenes/InsideScene";
import { ProcedureScene } from "@/components/scenes/ProcedureScene";
import { ConsultationScene } from "@/components/scenes/ConsultationScene";
import { ScrollPrompt } from "@/components/ScrollPrompt";
import { Biography } from "@/components/sections/Biography";
import { FieldsOfPractice } from "@/components/sections/FieldsOfPractice";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocateUs } from "@/components/sections/LocateUs";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "A cinematic journey through vascular anatomy, pathology and endovascular treatment with Dr. Zuko Booi — and book a consultation.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <main className="relative w-full bg-background selection:bg-primary/30">
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
