

export type NavigationItem = {
  label: string;
  icon: string;
  href: string;
  enabled: boolean;
};

export const NAVIGATION: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: "🏠",
    href: "/atelier",
    enabled: true,
  },
  {
    label: "Produits",
    icon: "📦",
    href: "/atelier/produits",
    enabled: true,
  },
  {
    label: "Commandes",
    icon: "📋",
    href: "/atelier/commandes",
    enabled: true,
  },
  {
    label: "Stock",
    icon: "📍",
    href: "/atelier/stock",
    enabled: true,
  },
  {
    label: "Créations",
    icon: "🌱",
    href: "/atelier/creations",
    enabled: true,
  },
  {
    label: "Fabrication",
    icon: "👩‍🎨",
    href: "/atelier/fabrication",
    enabled: true,
  },
  {
    label: "Artisans",
    icon: "🧵",
    href: "/atelier/artisans",
    enabled: true,
  },
  {
    label: "Fournisseurs",
    icon: "🚚",
    href: "/atelier/fournisseurs",
    enabled: true,
  },
  {
    label: "Paramètres",
    icon: "⚙️",
    href: "/atelier/parametres",
    enabled: true,
  },
];
