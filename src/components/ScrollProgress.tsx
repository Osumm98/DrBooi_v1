"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Vertical line indicator on the right edge */}
      <div className="fixed right-0 top-0 bottom-0 w-1 bg-foreground/5 z-50 pointer-events-none hidden md:block">
        <motion.div 
          className="w-full bg-primary origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>
      
      {/* Top progress bar for mobile */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-foreground/5 z-[100] pointer-events-none md:hidden">
        <motion.div 
          className="h-full bg-primary origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </>
  );
}
