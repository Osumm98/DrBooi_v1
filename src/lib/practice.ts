// Single source of truth for practice details.
// Consumed by booking (CalendarView), LocateUs section, and SEO JSON-LD (page.tsx) + sitemap.
// Keep this in sync with real practice information.

export const SITE_URL = "https://booipractice.co.za";

export const practice = {
  name: "Dr. Zuko Booi",
  role: "Vascular Surgeon",
  specialty: "Vascular Surgery",
  email: "booipractice@outlook.com",
  hours: "Mon–Fri, 08:00–16:00",
  credentials: ["MBBCh (Wits)", "FCS (SA)", "MMed (Wits)", "Cert Vasc (SA)"],
} as const;

export type Location = {
  slug: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  tel: string;
  email: string;
};

export const locations: Location[] = [
  {
    slug: "soweto",
    name: "Dr SK Matseke Memorial Hospital",
    address:
      "Suite 4, 1st Floor, Hospital Building, Chris Hani Road & Cnr Immink Drive, Diepkloof",
    city: "Soweto",
    province: "Gauteng",
    postalCode: "1862",
    tel: "011 933 5121",
    email: "booipractice@outlook.com",
  },
  {
    slug: "sandton",
    name: "Mediclinic Sandton Hospital",
    address: "Suite 103, North Block, Cnr Main Road & Peter Place, Bryanston",
    city: "Sandton",
    province: "Gauteng",
    postalCode: "2021",
    tel: "011 709 2149",
    email: "booipractice@outlook.com",
  },
  {
    slug: "krugersdorp",
    name: "Netcare Krugersdorp Hospital",
    address: "Lift 5, Second Floor, 9 Burger Street",
    city: "Krugersdorp",
    province: "Gauteng",
    postalCode: "1739",
    tel: "011 951 0574",
    email: "booipractice@outlook.com",
  },
];

export const telHref = (tel: string) =>
  `tel:+27${tel.replace(/\D/g, "").replace(/^0/, "")}`;
