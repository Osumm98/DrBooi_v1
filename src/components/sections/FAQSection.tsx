"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is the difference between vascular and endovascular surgery?",
    a: "Vascular surgery involves traditional open procedures where an incision is made to repair or bypass damaged blood vessels. Endovascular surgery is a minimally invasive technique performed from inside the blood vessels using small catheters inserted through tiny punctures in the skin. Examples include angioplasty, stent placement, and endovascular aneurysm repair (EVAR). These procedures usually result in smaller incisions, faster recovery, and shorter hospital stays."
  },
  {
    q: "What is the most common vascular disease?",
    a: "The most common vascular disease is Peripheral Arterial Disease (PAD), caused by narrowing of the arteries due to fatty deposits. This reduces blood flow to the limbs. Symptoms may include leg pain when walking, numbness, cold feet, slow-healing wounds, and changes in skin colour. Risk factors include smoking, diabetes, high blood pressure, and high cholesterol. Early diagnosis is important to prevent complications."
  },
  {
    q: "Do I need a referral?",
    a: "A referral from your general practitioner (GP) or another specialist is often recommended, particularly if your medical aid requires one. However, patients may also book directly if they experience symptoms such as leg pain while walking, leg swelling, non-healing wounds, varicose veins, or signs of blood clots. Our team can assist if you are unsure."
  },
  {
    q: "Will your medical aid cover the procedures?",
    a: "Most medical aid schemes cover vascular consultations and medically necessary procedures, depending on your specific plan and benefits. Coverage may vary based on the medical aid provider, the procedure required, and hospital or specialist network agreements. Our administrative team can assist with authorisations and explain any potential co-payments."
  },
  {
    q: "Will I need to stay in hospital?",
    a: "Not all vascular procedures require hospital admission. Some minimally invasive endovascular procedures can be performed as day procedures or short overnight stays, while more complex surgeries may require a few days of hospital recovery. Your surgeon will discuss this with you during your consultation."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-background text-foreground z-10 border-t border-foreground/5">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-foreground/10 rounded-2xl overflow-hidden bg-foreground/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-6 flex items-center justify-between gap-4 hover:bg-foreground/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="font-heading font-semibold text-lg md:text-xl">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={cn(
                    "w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0",
                    openIndex === index && "rotate-180"
                  )} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-foreground/70 leading-relaxed border-t border-foreground/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
