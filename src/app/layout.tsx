import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BurgerMenu } from "@/components/BurgerMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TopContactBar } from "@/components/TopContactBar";
import { Logo } from "@/components/Logo";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SITE_URL } from "@/lib/practice";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Zuko Booi | Vascular Surgeon in Johannesburg",
    template: "%s | Dr. Zuko Booi",
  },
  description:
    "Dr. Zuko Booi is a certified vascular surgeon in Johannesburg, consulting in Soweto, Sandton and Krugersdorp. Diagnosis and treatment of arterial and venous conditions, endovascular procedures, and dialysis access. Book a consultation.",
  keywords: [
    "vascular surgeon Johannesburg",
    "vascular surgeon Soweto",
    "vascular surgeon Sandton",
    "vascular surgeon Krugersdorp",
    "endovascular surgery",
    "dialysis access",
    "peripheral arterial disease",
    "Dr Zuko Booi",
  ],
  authors: [{ name: "Dr. Zuko Booi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "Dr. Zuko Booi",
    title: "Dr. Zuko Booi | Vascular Surgeon in Johannesburg",
    description:
      "Certified vascular surgeon consulting in Soweto, Sandton and Krugersdorp. Book a consultation online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Zuko Booi | Vascular Surgeon in Johannesburg",
    description:
      "Certified vascular surgeon consulting in Soweto, Sandton and Krugersdorp. Book a consultation online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {/* Global Noise Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            
            <ScrollProgress />
            <TopContactBar />
            <Logo />
            <ThemeToggle />
            <BurgerMenu />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
