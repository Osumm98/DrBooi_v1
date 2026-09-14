"use client";

import { motion, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollPrompt() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 100 && isVisible) {
        setIsVisible(false);
      } else if (latest <= 100 && !isVisible) {
        setIsVisible(true);
      }
    });
  }, [scrollY, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-2 bg-background/60 backdrop-blur-md px-6 py-3 rounded-full border border-foreground/10 shadow-lg">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-foreground/80 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
}
