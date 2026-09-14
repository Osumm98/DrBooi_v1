"use client";

import { useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { SceneCanvas } from "@/components/SceneCanvas";
import { KineticHeading } from "@/components/typography/KineticHeading";
import { RevealText } from "@/components/typography/RevealText";
import { BookingEngine } from "@/components/booking/BookingEngine";

export function ConsultationScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade in at 0.5, reach full opacity at 0.7, and stay at 1 until the very end.
  const opacity = useTransform(scrollYProgress, [0.5, 0.7, 0.95, 1], [0, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0.5, 0.7, 0.95, 1], [100, 0, 0, 0]);

  return (
    <section ref={containerRef} id="scene-consultation" className="relative h-[400vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SceneCanvas 
          folderPath="/sections/3. Consultation" 
          frameCount={150} 
          scrollYProgress={scrollYProgress} 
        />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <motion.div 
            style={{ opacity, y }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
          >
            {/* Left: Copy */}
            <div className="space-y-6 relative">
              {/* Subtle radial glow behind text to ensure contrast against busy backgrounds */}
              <div className="absolute -inset-10 bg-black/40 blur-3xl rounded-full z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <KineticHeading 
                  text="SECURE YOUR" 
                  className="text-4xl md:text-6xl font-heading font-black text-white tracking-widest uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,1)]"
                />
                <KineticHeading 
                  text="CIRCULATION" 
                  delay={0.2}
                  className="text-4xl md:text-6xl font-heading font-bold text-primary tracking-widest uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,1)]"
                />
                <div className="pt-4 md:pt-6 border-l-4 border-primary pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm mt-6 shadow-2xl">
                  <RevealText
                    text="Book a consultation with Dr. Booi in a few steps. Choose your hospital, date and time, and the rooms will confirm your appointment."
                    delay={0.6}
                    className="text-lg md:text-xl font-sans text-white font-semibold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Gamified Booking Interface */}
            <div className="w-full relative z-20">
              <BookingEngine />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
