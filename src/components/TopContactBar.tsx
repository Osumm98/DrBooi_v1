"use client";

import { Mail, Clock, Phone } from "lucide-react";

export function TopContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-foreground/5 py-2 px-4 md:px-8 text-xs md:text-sm font-medium text-foreground/80 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 transition-colors">
      <div className="flex items-center gap-4">
        <a href="mailto:booipractice@outlook.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Mail className="w-4 h-4" />
          <span>booipractice@outlook.com</span>
        </a>
        <span className="hidden md:inline-block w-px h-4 bg-foreground/20" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>08:00 - 16:00</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <a href="tel:0119335121" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline">Soweto:</span> 011 933 5121
        </a>
        <span className="w-px h-4 bg-foreground/20" />
        <a href="tel:0117092149" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline">Sandton:</span> 011 709 2149
        </a>
        <span className="w-px h-4 bg-foreground/20" />
        <a href="tel:0119510574" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline">Krugersdorp:</span> 011 951 0574
        </a>
      </div>
    </div>
  );
}
