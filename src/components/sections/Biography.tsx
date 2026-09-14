"use client";

import { motion, Variants } from "framer-motion";
import { Award, HeartPulse, GraduationCap, MapPin } from "lucide-react";

export function Biography() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section className="relative w-full bg-background py-24 md:py-32 px-4 md:px-8 overflow-hidden z-10">
      {/* Animated Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10"
      >
        {/* Card 1: The Surgeon (Hero) - Span 2x2 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700" />
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-2 tracking-tighter">
            Dr. Zuko<br />Booi
          </h2>
          <p className="text-primary font-medium tracking-widest uppercase mb-8 font-sans">
            Certified Vascular Surgeon
          </p>
          <div className="space-y-4 text-white/80 font-sans text-lg font-light leading-relaxed">
            <p>
              A well-known and highly recommended Vascular surgeon in Johannesburg. Born and raised in the small rural village of Mqanduli in the Eastern Cape.
            </p>
            <p>
              Affectionately known as "The Good Dr"—a name first coined by his running mates—he brings small-town warmth to world-class medical expertise.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Credentials */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="font-heading font-semibold text-xl text-white">Credentials</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['MBBCh(Wits)', 'FCS(SA)', 'MMed(Wits)', 'Cert Vasc(SA)'].map((cert) => (
              <span key={cert} className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm font-mono text-white/90 shadow-inner">
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 3: The Discipline (Running) */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden"
        >
          <HeartPulse className="w-8 h-8 text-primary mb-6" />
          <h3 className="font-heading font-semibold text-xl text-white mb-4">The Discipline</h3>
          <p className="text-white/80 font-sans text-sm leading-relaxed">
            An avid long-distance runner and multiple Comrades Marathon finisher. He draws inspiration from the extreme resilience required on the road, bringing unmatched patience and endurance to the operating room.
          </p>
        </motion.div>

        {/* Card 4: Education */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-1 lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <GraduationCap className="w-8 h-8 text-primary mb-6" />
          <h3 className="font-heading font-semibold text-xl text-white mb-4">Education</h3>
          <p className="text-white/80 font-sans text-sm leading-relaxed mb-4">
            Medical degree (MBBCh) from the University of the Witwatersrand. Specialist training in General Surgery FCS(SA) and Master of Medicine (Mmed).
          </p>
        </motion.div>

        {/* Card 5: Expertise - Span 2 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-2 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <MapPin className="w-8 h-8 text-primary mb-6" />
          <h3 className="font-heading font-semibold text-xl text-white mb-4">Clinical Focus</h3>
          <p className="text-white/80 font-sans text-base leading-relaxed">
            Specializing in the diagnosis and treatment of arterial and venous vascular conditions. Expertise in both open and minimally invasive endovascular procedures, including renal access creation and management for dialysis patients.
          </p>
        </motion.div>

        {/* Card 6: Philosophy - Span 2 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-3 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <div className="flex h-full flex-col justify-center border-l-4 border-primary pl-6">
            <h3 className="font-heading font-semibold text-2xl text-white mb-4">The Philosophy</h3>
            <p className="text-white/90 font-sans text-lg font-light leading-relaxed italic">
              "A dedicated professional and devoted family man. I believe in partnering closely with patients to ensure they feel supported throughout their vascular journey."
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
