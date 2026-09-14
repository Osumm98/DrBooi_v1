"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { SceneCanvas } from "@/components/SceneCanvas";
import { KineticHeading } from "@/components/typography/KineticHeading";
import { RevealText } from "@/components/typography/RevealText";

export function InsideScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} id="scene-inside" className="relative h-[400vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SceneCanvas 
          folderPath="/sections/4. Inside 1" 
          frameCount={150} 
          scrollYProgress={scrollYProgress} 
        />
        
        {/* UI Overlay */}
        <div className="absolute inset-0 flex items-center justify-start p-6 md:p-16 lg:p-24 pointer-events-none">
          <motion.div 
            style={{ opacity, y }}
            className="w-full max-w-[90vw] md:max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: 64 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
                className="h-[2px] bg-cyan-400" 
              />
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">System Scan</span>
            </div>

            <KineticHeading 
              text="ATHEROSCLEROSIS" 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-wider"
            />
            <KineticHeading 
              text="DETECTED" 
              delay={0.2}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-light text-cyan-400 tracking-wider drop-shadow-lg"
            />
            
            <div className="pt-4 md:pt-6">
              <RevealText 
                text="Visualizing the invisible. When calcified plaque restricts luminal diameter, blood flow is critically compromised. Immediate intervention is required to prevent systemic ischemia."
                delay={0.6}
                className="text-lg md:text-xl font-sans text-white font-medium leading-relaxed drop-shadow-lg border-l-2 border-cyan-400 pl-4 md:pl-6"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
