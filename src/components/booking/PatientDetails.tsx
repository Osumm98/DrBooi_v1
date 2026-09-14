"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Stethoscope, ChevronRight, ChevronLeft } from "lucide-react";
import type { BookingData } from "./BookingEngine";

interface PatientDetailsProps {
  data: Pick<BookingData, "name" | "email" | "phone" | "reason" | "medicalAid" | "consent">;
  updateData: (fields: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PatientDetails({ data, updateData, onNext, onBack }: PatientDetailsProps) {
  const isValid =
    data.name.trim().length > 2 &&
    data.email.includes("@") &&
    data.phone.replace(/\D/g, "").length >= 9 &&
    data.consent;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 flex flex-col h-full"
    >
      <div>
        <h3 className="text-2xl font-heading font-semibold flex items-center gap-3 text-white">
          <User className="w-6 h-6 text-primary" />
          Your details
        </h3>
        <p className="text-white/60 font-sans mt-2 text-sm">
          So Dr. Booi&apos;s rooms can reach you to confirm.
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest block">Full name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="e.g. Thabo Mokoena"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest block">Email address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest block">Phone number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="e.g. 082 123 4567"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-widest block">
              Medical aid <span className="normal-case text-white/30">(optional)</span>
            </label>
            <input
              type="text"
              value={data.medicalAid}
              onChange={(e) => updateData({ medicalAid: e.target.value })}
              placeholder="e.g. Discovery"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-white/50 uppercase tracking-widest block">
              Reason <span className="normal-case text-white/30">(optional)</span>
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={data.reason}
                onChange={(e) => updateData({ reason: e.target.value })}
                placeholder="e.g. Leg pain, referral"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
              />
            </div>
          </div>
        </div>

        {/* POPIA consent */}
        <label className="flex items-start gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => updateData({ consent: e.target.checked })}
            className="mt-1 h-4 w-4 shrink-0 accent-primary cursor-pointer"
          />
          <span className="text-xs text-white/60 font-sans leading-relaxed">
            I consent to Dr. Booi&apos;s practice storing and using these details to contact me
            about this consultation request, in line with the POPI Act.
          </span>
        </label>
      </div>

      <div className="flex gap-4 mt-auto pt-6">
        <button
          onClick={onBack}
          className="w-14 h-14 shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 bg-white text-black font-heading font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
        >
          Review request
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
