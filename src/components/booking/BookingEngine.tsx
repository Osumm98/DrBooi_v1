"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarView } from "./CalendarView";
import { PatientDetails } from "./PatientDetails";
import { ReviewStep } from "./ReviewStep";
import { CheckCircle, Phone } from "lucide-react";
import { locations, telHref } from "@/lib/practice";

export type BookingData = {
  locationSlug: string | null;
  date: Date | null;
  timeSlot: string | null;
  name: string;
  email: string;
  phone: string;
  reason: string;
  medicalAid: string;
  consent: boolean;
};

export function BookingEngine() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    locationSlug: null,
    date: null,
    timeSlot: null,
    name: "",
    email: "",
    phone: "",
    reason: "",
    medicalAid: "",
    consent: false,
  });

  const updateData = (fields: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const reset = () =>
    setData({
      locationSlug: null,
      date: null,
      timeSlot: null,
      name: "",
      email: "",
      phone: "",
      reason: "",
      medicalAid: "",
      consent: false,
    });

  const selectedLocation = locations.find((l) => l.slug === data.locationSlug);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CalendarView key="step1" data={data} updateData={updateData} onNext={nextStep} />
        );
      case 2:
        return (
          <PatientDetails
            key="step2"
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <ReviewStep key="step3" data={data} onNext={nextStep} onBack={prevStep} />
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6 py-12"
          >
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white">Request received</h3>
            <p className="text-white/70 font-sans leading-relaxed max-w-sm">
              Thank you, {data.name.split(" ")[0] || "there"}. Dr. Booi&apos;s rooms will contact
              you at <strong>{data.email}</strong> to confirm your consultation
              {selectedLocation ? ` at ${selectedLocation.name}` : ""} on{" "}
              {data.date?.toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
              })}{" "}
              at {data.timeSlot}.
            </p>
            {selectedLocation && (
              <a
                href={telHref(selectedLocation.tel)}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                Need it sooner? Call {selectedLocation.tel}
              </a>
            )}
            <button
              onClick={() => {
                setStep(1);
                reset();
              }}
              className="mt-2 text-primary hover:text-primary/80 font-sans text-sm underline underline-offset-4 cursor-pointer"
            >
              Book another consultation
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px] flex flex-col">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      )}

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
}
