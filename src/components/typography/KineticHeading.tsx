"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  style?: React.CSSProperties;
}

export function KineticHeading({ text, className, delay = 0, as: Component = "h1", style }: KineticHeadingProps) {
  // Split text into words, then letters
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex flex-wrap font-heading leading-none", className)}
      style={style}
    >
      {words.map((word, idx) => (
        <span key={idx} className="mr-[0.25em] inline-flex whitespace-nowrap overflow-hidden">
          {word.split("").map((letter, letterIdx) => (
            <motion.span key={letterIdx} variants={child} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
