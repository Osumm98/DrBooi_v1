"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Diagnostic Baseline", href: "#scene-hero" },
  { name: "Visualizing Pathology", href: "#scene-inside" },
  { name: "Endovascular Mastery", href: "#scene-procedure" },
  { name: "Secure Consultation", href: "#scene-consultation" },
];

export function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[52px] right-4 z-[70] p-3 rounded-full bg-background/80 backdrop-blur-md border border-foreground/10 text-foreground hover:bg-foreground/10 transition-colors shadow-lg cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >  <Menu className="w-5 h-5 text-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] flex"
          >
            {/* Backdrop */}
            <div
              className="flex-1 bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {/* Menu Panel */}
            <div className="w-full max-w-sm bg-background border-l border-foreground/10 h-full p-8 shadow-2xl flex flex-col justify-center relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-foreground/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="text-3xl font-heading font-semibold text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-foreground/10">
                <p className="text-sm font-sans text-foreground/50">
                  Dr. Zuko Booi © {new Date().getFullYear()}
                </p>
                <p className="text-sm font-sans text-foreground/50">
                  Vascular Surgery & Endovascular Precision
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
