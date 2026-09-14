"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const locations = [
  {
    name: "Dr SK Matseke Memorial Hospital",
    address: "Suit 4, 1st Floor, Hospital Building, Chris Hani Road & Cnr Immink Drive, Diepkloof, Soweto, 1862",
    tel: "011 933 5121",
    email: "booipractice@outlook.com"
  },
  {
    name: "Mediclinic Sandton Hospital",
    address: "Suite 103, North Block, Cnr Main Road & Peter Place, Bryanston, 2021",
    tel: "011 709 2149",
    email: "booipractice@outlook.com"
  },
  {
    name: "Netcare Krugersdorp Hospital",
    address: "Lift 5, Second Floor, 9 Burger Street, Krugersdorp, 1739",
    tel: "011 951 0574",
    email: "booipractice@outlook.com"
  }
];

export function LocateUs() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-background text-foreground z-10 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Locate Us
          </h2>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-foreground/5 border border-foreground/10 rounded-2xl p-8 hover:bg-foreground/10 transition-colors duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center mb-6 border border-foreground/10 group-hover:border-primary/50 transition-colors duration-300">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-heading text-xl font-semibold mb-4 leading-snug">
                {loc.name}
              </h3>
              
              <p className="text-foreground/70 leading-relaxed mb-8 flex-grow">
                {loc.address}
              </p>
              
              <div className="space-y-3 pt-6 border-t border-foreground/10">
                <a href={`tel:${loc.tel.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  {loc.tel}
                </a>
                <a href={`mailto:${loc.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  {loc.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
