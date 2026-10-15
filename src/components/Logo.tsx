"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Logo() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onLight = pathname === "/";

  // Scale down slightly after scrolling 100px, but never fade out
  const scale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const y = useTransform(scrollY, [0, 100], [0, -5]);

  return (
    <motion.div
      style={{ scale, y }}
      className="fixed top-[48px] md:top-[60px] left-4 md:left-8 z-[60] origin-top-left pointer-events-auto"
    >
      <Link href="/" className="block" aria-label="Dr Zuko Booi — home">
        {onLight ? (
          // Official transparent logo on the light landing. Kept at/under its
          // native 300px width so it stays crisp on high-DPI screens.
          <Image
            src="/logo.png"
            alt="Dr Zuko Booi — Vascular Surgeon"
            width={300}
            height={100}
            className="w-36 md:w-40 h-auto drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]"
            priority
            unoptimized
          />
        ) : (
          // Light logo for the dark experience.
          <Image
            src="/Logo 2.png"
            alt="Dr Zuko Booi Logo"
            width={300}
            height={100}
            className="w-40 md:w-52 h-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
            priority
          />
        )}
      </Link>
    </motion.div>
  );
}
