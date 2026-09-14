"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, ChevronLeft, ChevronDown, MapPin } from "lucide-react";
import { locations } from "@/lib/practice";
import type { BookingData } from "./BookingEngine";

interface CalendarViewProps {
  data: Pick<BookingData, "locationSlug" | "date" | "timeSlot">;
  updateData: (fields: Partial<BookingData>) => void;
  onNext: () => void;
}

export function CalendarView({ data, updateData, onNext }: CalendarViewProps) {
  const [view, setView] = useState<"month" | "week">("month");

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  const daysInMonth = 30;
  const startDay = 2;
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const timeSlots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  const handleSelectDate = (day: number) => {
    const d = new Date();
    d.setDate(day);
    updateData({ date: d });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 flex flex-col h-full"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-heading font-semibold flex items-center gap-3 text-white">
          <Calendar className="w-6 h-6 text-primary" />
          Book a consultation
        </h3>

        <div className="flex bg-white/10 rounded-lg p-1 border border-white/5">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1 text-sm font-sans rounded-md transition-colors ${view === "month" ? "bg-primary text-white" : "text-white/60 hover:text-white"}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-3 py-1 text-sm font-sans rounded-md transition-colors ${view === "week" ? "bg-primary text-white" : "text-white/60 hover:text-white"}`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Location
          </label>
          <div className="relative">
            <select
              value={data.locationSlug ?? ""}
              onChange={(e) => updateData({ locationSlug: e.target.value || null })}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-10 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans cursor-pointer"
            >
              <option value="" disabled className="bg-neutral-900">
                Select a hospital…
              </option>
              {locations.map((loc) => (
                <option key={loc.slug} value={loc.slug} className="bg-neutral-900">
                  {loc.name} — {loc.city}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
          </div>
        </div>

        {/* Calendar Header */}
        <div className="flex justify-between items-center px-2">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <span className="font-heading font-bold text-xl text-white">
            {currentMonth} {year}
          </span>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="text-center text-xs font-mono text-white/40 uppercase py-2">
              {d}
            </div>
          ))}

          {(view === "month" ? days : days.slice(7, 14)).map((day, i) => (
            <button
              key={i}
              disabled={!day || day < today.getDate()}
              onClick={() => day && handleSelectDate(day)}
              className={`
                aspect-square flex items-center justify-center rounded-xl border font-sans font-medium transition-all duration-300 text-base
                ${!day ? "border-transparent" : "cursor-pointer"}
                ${day && day < today.getDate() ? "border-transparent text-white/30 line-through cursor-not-allowed" : ""}
                ${day && day >= today.getDate() && data.date?.getDate() !== day ? "border-white/20 bg-white/5 hover:border-primary/50 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" : ""}
                ${data.date?.getDate() === day ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(239,68,68,0.6)] font-bold scale-105" : ""}
              `}
            >
              {day || ""}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        {data.date && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-white/10"
          >
            <h4 className="text-sm font-sans text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
              Select time <ChevronDown className="w-4 h-4" />
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => updateData({ timeSlot: time })}
                  className={`
                    py-2 rounded-lg border text-sm font-mono transition-colors cursor-pointer
                    ${data.timeSlot === time ? "bg-white text-black border-white" : "border-white/20 text-white/80 hover:border-white/50"}
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!data.locationSlug || !data.date || !data.timeSlot}
        className="w-full bg-white text-black font-heading font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group mt-auto"
      >
        Continue
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
