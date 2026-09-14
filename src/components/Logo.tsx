"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function Logo() {
  const { scrollY } = useScroll();
  
  // Scale down slightly after scrolling 100px, but never fade out
  const scale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const y = useTransform(scrollY, [0, 100], [0, -5]);

  return (
    <motion.div 
      style={{ scale, y }}
      className="fixed top-[48px] md:top-[60px] left-4 md:left-8 z-[60] origin-top-left pointer-events-auto"
    >
      <Link href="/" className="block">
        <Image
          src="/Logo 2.png"
          alt="Dr Zuko Booi Logo"
          width={300}
          height={100}
          className="w-48 md:w-64 h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10"
          priority
        />
      </Link>
    </motion.div>
  );
}
