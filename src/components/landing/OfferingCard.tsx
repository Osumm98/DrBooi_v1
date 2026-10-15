"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export type Offering = {
  title: string;
  description: string;
  href: string;
  cta: string;
  Art: (props: { x: MotionValue<number>; y: MotionValue<number> }) => React.ReactNode;
};

export function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
  const { title, description, href, cta, Art } = offering;
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 150, damping: 18, mass: 0.4 });
  const y = useSpring(py, { stiffness: 150, damping: 18, mass: 0.4 });

  const rotateY = useTransform(x, [-0.5, 0.5], [6, -6]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_12px_30px_-12px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_1px_3px_rgba(239,68,68,0.10),0_24px_50px_-20px_rgba(239,68,68,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`${title} — ${cta}`}
      >
        {/* soft accent wash on hover */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />

        {/* illustration stage */}
        <div
          className="relative mb-7 h-36 w-full rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-100"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="absolute inset-0 p-3 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
            <Art x={x} y={y} />
          </div>
        </div>

        <h3
          className="font-heading text-xl font-semibold text-slate-900"
          style={{ transform: "translateZ(28px)" }}
        >
          {title}
        </h3>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.a>
    </motion.div>
  );
}
