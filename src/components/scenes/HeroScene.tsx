"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { SceneCanvas } from "@/components/SceneCanvas";
import { KineticHeading } from "@/components/typography/KineticHeading";
import { RevealText } from "@/components/typography/RevealText";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} id="scene-hero" className="relative h-[400vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SceneCanvas 
          folderPath="/sections/1. Hero Doc" 
          frameCount={150} 
          scrollYProgress={scrollYProgress} 
        />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-6 md:p-16 lg:p-24 pointer-events-none pb-24 md:pb-32">
          <motion.div 
            style={{ opacity, y }}
            className="w-full max-w-[90vw] md:max-w-[70vw] space-y-6"
          >
            <KineticHeading 
              text="THE ARCHITECTURE" 
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-bold text-transparent tracking-tighter"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
            />
            <KineticHeading 
              text="OF LIFE" 
              delay={0.2}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-bold text-white tracking-tighter drop-shadow-2xl"
            />
            
            <div className="max-w-xl pt-4 md:pt-8 pl-1 md:pl-4 border-l-2 border-primary/80">
              <RevealText 
                text="60,000 miles of hemodynamic precision. Dr. Zuko Booi operates at the vanguard of vascular surgery, specializing in the complex mechanics of human circulation." 
                delay={0.6}
                className="text-lg md:text-xl font-sans text-white font-medium drop-shadow-lg leading-relaxed"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
