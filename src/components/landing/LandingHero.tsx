"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Play,
  ShieldCheck,
  Activity,
  HeartHandshake,
  MapPin,
  Phone,
  Stethoscope,
  Sparkles,
  Quote,
} from "lucide-react";
import { OfferingCard, type Offering } from "./OfferingCard";
import {
  ArterialVenousArt,
  VascularTraumaArt,
  DialysisAccessArt,
} from "./illustrations";
import { locations, practice, telHref } from "@/lib/practice";

const offerings: Offering[] = [
  {
    title: "Arterial & Venous Disorders",
    description:
      "Diagnosis and treatment of the vessels that carry blood through the body — from narrowed arteries to troublesome veins.",
    href: "/experience",
    cta: "See it in motion",
    Art: ArterialVenousArt,
  },
  {
    title: "Vascular Trauma",
    description:
      "Precise, urgent intervention for injury to arteries and veins from impact, penetrating wounds or fractures.",
    href: "/experience",
    cta: "See it in motion",
    Art: VascularTraumaArt,
  },
  {
    title: "Dialysis Access",
    description:
      "Reliable access creation and revision for patients on haemodialysis — built to last and carefully maintained.",
    href: "/experience",
    cta: "See it in motion",
    Art: DialysisAccessArt,
  },
];

const approach = [
  {
    icon: Activity,
    title: "Minimally invasive first",
    body: "Endovascular techniques through tiny punctures — smaller scars, faster recovery, shorter stays.",
  },
  {
    icon: Stethoscope,
    title: "Precise diagnostics",
    body: "Careful assessment and imaging to understand exactly what the vessels are doing before anything else.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership in care",
    body: "You are supported through every step of your vascular journey, with clear explanations throughout.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted credentials",
    body: `Board-certified vascular surgeon — ${practice.credentials.slice(0, 3).join(", ")}.`,
  },
];

const gallery = [
  { src: "/dr-booi-consult.jpg", label: "In consultation" },
  { src: "/vascular-flow.jpg", label: "Inside the vessels" },
  { src: "/dr-booi-run.jpg", label: "Comrades Marathon finisher" },
];

/* --------------------------------------- Hero cycling image gallery */

function HeroGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(py, { stiffness: 120, damping: 20, mass: 0.5 });
  const rotateY = useTransform(x, [-0.5, 0.5], [5, -5]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-5, 5]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % gallery.length), 6200);
    return () => clearInterval(t);
  }, [mounted]);

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

  const active = gallery[index];

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-transparent to-secondary/15 blur-2xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] bg-slate-900 ring-1 ring-slate-900/10 shadow-[0_40px_90px_-40px_rgba(15,23,42,0.6)]"
      >
        {/* static base image — identical on server and first client paint */}
        <Image
          src={gallery[0].src}
          alt={`Dr. Zuko Booi — ${gallery[0].label}`}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 440px"
          className="object-cover"
        />

        {/* cross-fading, slowly zooming slides (client only, after mount) */}
        {mounted && (
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduced ? 1 : 1.1 }}
                animate={{ scale: reduced ? 1 : 1.02 }}
                transition={{ duration: 7.5, ease: "linear" }}
              >
                <Image
                  src={active.src}
                  alt={`Dr. Zuko Booi — ${active.label}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 440px"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* crimson light sweep on each change */}
        {mounted && !reduced && (
          <motion.div
            key={`sweep-${index}`}
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{ width: "45%" }}
          />
        )}

        {/* legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

        {/* caption */}
        <div className="absolute left-5 top-5" style={{ transform: "translateZ(40px)" }}>
          {mounted ? (
            <AnimatePresence mode="wait">
              <motion.span
                key={active.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.4 }}
                className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {gallery[0].label}
            </span>
          )}
        </div>

        {/* credential chip */}
        <div
          className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-md"
          style={{ transform: "translateZ(50px)" }}
        >
          <div>
            <p className="font-heading text-sm font-semibold text-white">Dr. Zuko Booi</p>
            <p className="text-xs text-white/70">Certified Vascular Surgeon</p>
          </div>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            FCS(SA)
          </span>
        </div>

        {/* progress dots */}
        <div className="absolute bottom-[86px] left-5 flex gap-1.5" style={{ transform: "translateZ(40px)" }}>
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setIndex(i)}
              aria-label={`Show ${g.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------- Landing */

export function LandingHero() {
  return (
    <div className="relative w-full bg-[#FAFAF9] text-slate-900">
      {/* ============================================= HERO */}
      <section className="relative overflow-hidden">
        {/* subtle video backdrop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16]"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* porcelain wash keeps text crisp, lets video breathe on the right */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/90 to-[#FAFAF9]/50" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 md:pt-40 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                Accepting referrals
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Johannesburg
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-heading text-5xl font-bold leading-[1.0] tracking-tight text-slate-900 md:text-7xl xl:text-[5.5rem]"
            >
              Vascular care,
              <br />
              made{" "}
              <span className="relative inline-block text-primary">
                clear.
                <motion.svg
                  viewBox="0 0 200 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-primary/60"
                  aria-hidden
                >
                  <motion.path
                    d="M3 11 C40 4 80 4 118 9 C150 13 176 10 197 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mt-7 max-w-xl font-sans text-lg leading-relaxed text-slate-600 lg:mx-0"
            >
              Dr. Zuko Booi treats the arteries and veins that keep you moving.
              Explore his work through calm, interactive illustrations — then step
              into the full visual story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="/experience"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-heading font-semibold text-white shadow-[0_10px_30px_-8px_rgba(239,68,68,0.55)] transition-transform hover:scale-[1.03]"
              >
                <Play className="h-4 w-4" /> Enter the experience
              </a>
              <a
                href="/experience#scene-consultation"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-heading font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                <CalendarDays className="h-4 w-4 text-primary" /> Book a consultation
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500 lg:justify-start"
            >
              {practice.credentials.slice(0, 4).map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-secondary" /> {c}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <HeroGallery />
          </motion.div>
        </div>
      </section>

      {/* ============================================= STATS STRIP */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 md:pt-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200/60 md:grid-cols-4">
          {[
            { k: "3", v: "Johannesburg hospitals" },
            { k: "20+ yrs", v: "Surgical experience" },
            { k: "Open + keyhole", v: "Full treatment range" },
            { k: "FCS(SA)", v: "Board certified" },
          ].map((s) => (
            <div key={s.v} className="bg-white px-6 py-7 text-center">
              <div className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 text-sm text-slate-500">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================= MEET THE SURGEON */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-slate-900 ring-1 ring-slate-200 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.5)]">
              <Image
                src="/dr-booi-theatre.jpg"
                alt="Dr. Zuko Booi in the operating theatre"
                fill
                sizes="(max-width: 768px) 80vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              Meet the surgeon
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              &ldquo;The Good Dr&rdquo;
            </h2>
            <div className="mt-5 space-y-4 text-lg font-light leading-relaxed text-slate-600">
              <p>
                Born and raised in the rural village of Mqanduli in the Eastern
                Cape, Dr. Zuko Booi is a well-known and highly recommended
                vascular surgeon in Johannesburg — bringing small-town warmth to
                world-class medical expertise.
              </p>
              <p className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-base text-slate-700 shadow-sm">
                <Quote className="mt-1 h-5 w-5 shrink-0 text-primary" />
                An avid long-distance runner and multiple Comrades Marathon
                finisher, he brings the same patience and endurance to the
                operating room.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {practice.credentials.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================= OFFERINGS */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              What Dr. Booi treats
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Three fields of practice
            </h2>
            <p className="mt-2 max-w-md font-sans text-slate-600">
              Hover each illustration to bring it to life, then enter the full
              scroll experience.
            </p>
          </div>
          <a
            href="/experience"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:gap-3"
          >
            Full experience <ArrowRight className="h-4 w-4 transition-all" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offerings.map((offering, i) => (
            <OfferingCard key={offering.title} offering={offering} index={i} />
          ))}
        </div>
      </section>

      {/* ============================================= APPROACH */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
            The standard of care
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Why patients are referred to Dr. Booi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-slate-900">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================= EXPERIENCE TEASER */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 text-center md:px-16 md:py-24">
          <Image
            src="/vascular-flow.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="relative">
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              The dynamic experience
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              Travel inside the vascular system
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-white/75">
              A cinematic, scroll-driven journey through anatomy, pathology and
              treatment — ending where you can book a consultation.
            </p>
            <a
              href="/experience"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading font-semibold text-slate-900 transition-transform hover:scale-[1.03]"
            >
              <Play className="h-4 w-4 text-primary" /> Enter the experience
            </a>
          </div>
        </div>
      </section>

      {/* ============================================= LOCATIONS */}
      <section className="relative mt-24 overflow-hidden bg-slate-50 py-24">
        {/* art-directed backdrop: faint vessel field + crimson bloom */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-slate-300"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 600"
          aria-hidden
        >
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5">
            <path d="M-20 120 C200 140 320 60 520 120 C760 190 900 90 1220 150" />
            <path d="M-20 300 C240 320 360 240 560 300 C800 370 940 270 1220 330" />
            <path d="M-20 470 C220 490 340 410 540 470 C780 540 920 440 1220 500" />
          </g>
        </svg>
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <p className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              <span className="h-px w-8 bg-primary" /> Where to find us
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Three rooms across <span className="text-primary">Johannesburg</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.a
                key={loc.slug}
                href={telHref(loc.tel)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:border-primary/30 hover:shadow-[0_28px_55px_-22px_rgba(239,68,68,0.3)]"
              >
                {/* top accent bar */}
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-rose-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* ghost index */}
                <span className="pointer-events-none absolute -right-2 -top-4 font-heading text-8xl font-bold text-slate-100 transition-colors group-hover:text-primary/10">
                  {i + 1}
                </span>

                <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-[0_8px_20px_-8px_rgba(239,68,68,0.6)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="relative font-heading text-lg font-semibold text-slate-900">
                  {loc.name}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {loc.address}, {loc.city}, {loc.postalCode}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-800 group-hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" /> {loc.tel}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= FINAL CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-600 via-primary to-rose-700 px-8 py-20 text-center shadow-[0_40px_90px_-40px_rgba(239,68,68,0.6)]">
          {/* vascular imagery + depth */}
          <Image
            src="/vascular-flow.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />

          <div className="relative flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Priority consultations
            </span>
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              Ready to understand your circulation?
            </h2>
            <p className="max-w-lg font-sans text-white/85">
              Book a consultation with Dr. Booi&apos;s rooms — no payment is taken
              online.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href="/experience#scene-consultation"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading font-semibold text-primary shadow-lg transition-transform hover:scale-[1.03]"
              >
                <CalendarDays className="h-4 w-4" /> Book a consultation
              </a>
              <a
                href={telHref(locations[0].tel)}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-heading font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> Call the rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= FOOTER */}
      <footer className="relative mt-16 overflow-hidden bg-slate-950 text-slate-300">
        {/* video backdrop — more prevalent than the hero */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/85 to-slate-950/95" />
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-heading text-lg font-bold text-white">Dr. Zuko Booi</p>
            <p className="mt-1 text-sm text-slate-400">Vascular &amp; Endovascular Surgeon</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Bringing small-town warmth to world-class vascular care across
              Johannesburg.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li><a href="/experience" className="hover:text-primary">The experience</a></li>
              <li><a href="/experience#scene-consultation" className="hover:text-primary">Book a consultation</a></li>
              <li><a href="/experience#scene-procedure" className="hover:text-primary">Procedures</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <a href={`mailto:${practice.email}`} className="hover:text-primary">
                  {practice.email}
                </a>
              </li>
              <li>{practice.hours}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Rooms</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <a href={telHref(loc.tel)} className="hover:text-primary">
                    {loc.city} · {loc.tel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Dr. Zuko Booi. All rights reserved.</p>
            <p>{practice.credentials.join(" · ")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
