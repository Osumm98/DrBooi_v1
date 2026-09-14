"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { SceneCanvas } from "@/components/SceneCanvas";
import { KineticHeading } from "@/components/typography/KineticHeading";
import { RevealText } from "@/components/typography/RevealText";

export function ProcedureScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} id="scene-procedure" className="relative h-[400vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SceneCanvas 
          folderPath="/sections/2. Procedure" 
          frameCount={150} 
          scrollYProgress={scrollYProgress} 
        />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-6 md:p-16 lg:p-24 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
          
          <motion.div 
            style={{ opacity, y }}
            className="w-full max-w-[90vw] md:max-w-2xl space-y-6 relative z-10"
          >
            <KineticHeading 
              text="ENDOVASCULAR" 
              className="text-4xl md:text-6xl lg:text-[5rem] font-heading font-black text-transparent tracking-tighter"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
            />
            <KineticHeading 
              text="PRECISION" 
              delay={0.2}
              className="text-4xl md:text-6xl lg:text-[5rem] font-heading font-bold text-white tracking-tighter drop-shadow-2xl"
            />
            
            <div className="pt-4 md:pt-6 pr-4 md:pr-12">
              <RevealText 
                text="Deploying a self-expanding Nitinol exoskeleton to crush plaque and permanently restore the vascular highway. Every millimeter is calculated."
                delay={0.6}
                className="text-lg md:text-xl font-sans text-white leading-relaxed font-medium drop-shadow-[0_4px_8px_rgba(0,0,0,1)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
