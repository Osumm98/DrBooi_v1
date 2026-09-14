"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, Syringe } from "lucide-react";

const fields = [
  {
    title: "Arterial and Venous Vascular Disorders",
    description: "Arterial and venous vascular disorders affect the blood vessels that carry blood throughout the body. We provide comprehensive diagnosis and treatment for all vascular conditions.",
    icon: Activity
  },
  {
    title: "Vascular Trauma Assessment & Intervention",
    description: "Vascular trauma refers to injury to the arteries or veins that results from blunt force, penetrating injuries, fractures, or medical procedures. Immediate and precise intervention is our priority.",
    icon: ShieldAlert
  },
  {
    title: "Vascular/Dialysis Access",
    description: "Patients with chronic kidney disease or kidney failure who require hemodialysis need a reliable and safe way to access the bloodstream. We specialize in access creation and revision.",
    icon: Syringe
  }
];

export function FieldsOfPractice() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-background text-foreground z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
            Fields of Practice
          </h2>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-foreground/5 border border-foreground/10 rounded-2xl p-8 hover:bg-foreground/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center mb-6 border border-foreground/10 group-hover:border-primary/50 transition-colors duration-300">
                <field.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4 leading-snug">
                {field.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {field.description}
              </p>
              
              <div className="mt-8">
                <span className="text-sm font-semibold text-primary group-hover:text-foreground transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
