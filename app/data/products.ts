// app/data/products.ts

export type ProductStatus =
  | "Brouillon"
  | "En développement"
  | "En vente"
  | "En pause"
  | "Arrêté";

export type ProductDimensions = {
  lengthCm: number;
  heightCm: number;
  widthCm: number;
};

export type ProductVariant = {
  id: string;

  sku?: string;
  name?: string;
  size?: string;
  color: string;

  price?: number;
  costPrice?: number;

  dimensions?: ProductDimensions;
  weightGrams?: number;

  stock?: number;
  stockMin?: number;
  status?: ProductStatus;

  image: string;
  imageHover?: string;
  images?: string[];

  barcode?: string;

  location?: string;

  isDefault?: boolean;

  sortOrder?: number;

};


export type Product = {
  // Identification permanente
  id: string;
  seedId?: string;
  sku?: string;
  referenceCode?: string;
  weightGrams?: number;


  // Identification commerciale
  slug: string;
  name: string;
  collection?: string;

  category:
    | "Bijoux"
    | "Sacs & accessoires"
    | "Décoration"
    | "Épices";

  status?: ProductStatus;

  // Tarification par défaut
  price: number;
  costPrice?: number;
  stock?: number;
  stockMin?: number;

  // Visuels principaux
  image: string;
  imageHover?: string;
  images?: string[];

  // Contenu du site
tags: string[];
description: string;
short?: string;
badges?: ("Nouveauté" | "Best-seller" | "Stock limité")[];

// Référencement Google (SEO)
seoTitle?: string;
seoDescription?: string;

  // Caractéristiques générales
  material?: string;
  dimensions?: string;

  // Fabrication
  originCountry?: string;
  handmade?: boolean;
  artisanPartner?: string;

  // Déclinaisons
  variants?: ProductVariant[];

  // Offre groupée
  bundle?: {
    qty: number;
    price: number;
  };
};


export const DEFAULT_PRODUCT_IMAGE =
"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80";

export const PRODUCTS: readonly Product[] = [
// SET TABLE
{
id: "p_set_table_001",
slug: "set-table-rabane-tisse",
name: "Set de table en rabane tissé",
price: 5,
category: "Décoration",
tags: ["rabane", "tissé", "fait main"],
description:
"Set de table en rabane tissé à la main. À l’unité ou en lot pour une table complète.",

short: "Fait main · 8 couleurs",
material: "Rabane",
dimensions: "35 × 45 cm",

bundle: { qty: 6, price: 19.5 },

image: "/images/decoration/set-table-tisse/multicolore-1.jpg",
},

// BIJOUX CORNE DE ZÉBU

// GOUTTE
{
id: "bijoux_zebu_goutte",
slug: "boucles-goutte-zebu",
name: "Boucles Goutte - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles en corne de zébu, légères et élégantes, façonnées à la main.",

variants: [
{ id: "goutte-jaune", color: "Jaune", image: "/images/bijoux/zebu/goutte-jaune.png" },
{ id: "goutte-violet", color: "Violet", image: "/images/bijoux/zebu/goutte-violet.png" },
{ id: "goutte-rouge", color: "Rouge", image: "/images/bijoux/zebu/goutte-rouge.png" },
{ id: "goutte-vert", color: "Vert", image: "/images/bijoux/zebu/goutte-vert.png" },
{ id: "goutte-bleu", color: "Bleu", image: "/images/bijoux/zebu/goutte-bleu.png" },
{ id: "goutte-orange", color: "Orange", image: "/images/bijoux/zebu/goutte-orange.png" },
{ id: "goutte-rose", color: "Rose", image: "/images/bijoux/zebu/goutte-rose.png" },
],

image: "/images/bijoux/zebu/goutte-jaune.png",
},

// FEUILLE
{
id: "bijoux_zebu_feuille",
slug: "boucles-feuille-zebu",
name: "Boucles Feuille - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles en forme de feuille, en corne de zébu, naturelles et élégantes.",

variants: [
{ id: "feuille-jaune", color: "Jaune", image: "/images/bijoux/zebu/feuille-jaune.png" },
{ id: "feuille-violet", color: "Violet", image: "/images/bijoux/zebu/feuille-violet.png" },
{ id: "feuille-rouge", color: "Rouge", image: "/images/bijoux/zebu/feuille-rouge.png" },
{ id: "feuille-vert", color: "Vert", image: "/images/bijoux/zebu/feuille-vert.png" },
{ id: "feuille-bleu", color: "Bleu", image: "/images/bijoux/zebu/feuille-bleu.png" },
{ id: "feuille-orange", color: "Orange", image: "/images/bijoux/zebu/feuille-orange.png" },
{ id: "feuille-rose", color: "Rose", image: "/images/bijoux/zebu/feuille-rose.png" },
],

image: "/images/bijoux/zebu/feuille-jaune.png",
},

// TRAPÈZE
{
id: "bijoux_zebu_trapeze",
slug: "boucles-trapeze-zebu",
name: "Boucles Trapèze - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles trapèze en corne de zébu, design moderne et artisanal.",

variants: [
{ id: "trapeze-jaune", color: "Jaune", image: "/images/bijoux/zebu/trapeze-jaune.png" },
{ id: "trapeze-violet", color: "Violet", image: "/images/bijoux/zebu/trapeze-violet.png" },
{ id: "trapeze-rouge", color: "Rouge", image: "/images/bijoux/zebu/trapeze-rouge.png" },
{ id: "trapeze-vert", color: "Vert", image: "/images/bijoux/zebu/trapeze-vert.png" },
{ id: "trapeze-bleu", color: "Bleu", image: "/images/bijoux/zebu/trapeze-bleu.png" },
{ id: "trapeze-orange", color: "Orange", image: "/images/bijoux/zebu/trapeze-orange.png" },
{ id: "trapeze-rose", color: "Rose", image: "/images/bijoux/zebu/trapeze-rose.png" },
],

image: "/images/bijoux/zebu/trapeze-jaune.png",
},

// CARRÉ
{
id: "bijoux_zebu_carre",
slug: "boucles-carre-zebu",
name: "Boucles Carré - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles carrées en corne de zébu, minimalistes et élégantes.",

variants: [
{ id: "carre-jaune", color: "Jaune", image: "/images/bijoux/zebu/carre-jaune.png" },
{ id: "carre-violet", color: "Violet", image: "/images/bijoux/zebu/carre-violet.png" },
{ id: "carre-rouge", color: "Rouge", image: "/images/bijoux/zebu/carre-rouge.png" },
{ id: "carre-vert", color: "Vert", image: "/images/bijoux/zebu/carre-vert.png" },
{ id: "carre-bleu", color: "Bleu", image: "/images/bijoux/zebu/carre-bleu.png" },
{ id: "carre-orange", color: "Orange", image: "/images/bijoux/zebu/carre-orange.png" },
{ id: "carre-rose", color: "Rose", image: "/images/bijoux/zebu/carre-rose.png" },
],

image: "/images/bijoux/zebu/carre-jaune.png",
},

// RECTANGLE
{
id: "bijoux_zebu_rectangle",
slug: "boucles-rectangle-zebu",
name: "Boucles Rectangle - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles rectangle en corne de zébu, fines et modernes.",

variants: [
{ id: "rectangle-jaune", color: "Jaune", image: "/images/bijoux/zebu/rectangle-jaune.png" },
{ id: "rectangle-violet", color: "Violet", image: "/images/bijoux/zebu/rectangle-violet.png" },
{ id: "rectangle-rouge", color: "Rouge", image: "/images/bijoux/zebu/rectangle-rouge.png" },
{ id: "rectangle-vert", color: "Vert", image: "/images/bijoux/zebu/rectangle-vert.png" },
{ id: "rectangle-bleu", color: "Bleu", image: "/images/bijoux/zebu/rectangle-bleu.png" },
{ id: "rectangle-orange", color: "Orange", image: "/images/bijoux/zebu/rectangle-orange.png" },
{ id: "rectangle-rose", color: "Rose", image: "/images/bijoux/zebu/rectangle-rose.png" },
],

image: "/images/bijoux/zebu/rectangle-jaune.png",
},

// ROND
{
id: "bijoux_zebu_rond",
slug: "boucles-rond-zebu",
name: "Boucles Rondes - corne de zébu",
price: 12.9,
category: "Bijoux",
tags: ["boucles", "zébu", "fait main"],
description: "Boucles rondes en corne de zébu, intemporelles et élégantes.",

variants: [
{ id: "rond-jaune", color: "Jaune", image: "/images/bijoux/zebu/rond-jaune.png" },
{ id: "rond-violet", color: "Violet", image: "/images/bijoux/zebu/rond-violet.png" },
{ id: "rond-rouge", color: "Rouge", image: "/images/bijoux/zebu/rond-rouge.png" },
{ id: "rond-vert", color: "Vert", image: "/images/bijoux/zebu/rond-vert.png" },
{ id: "rond-bleu", color: "Bleu", image: "/images/bijoux/zebu/rond-bleu.png" },
{ id: "rond-orange", color: "Orange", image: "/images/bijoux/zebu/rond-orange.png" },
{ id: "rond-rose", color: "Rose", image: "/images/bijoux/zebu/rond-rose.png" },
],

image: "/images/bijoux/zebu/rond-jaune.png",
}, 
// VANILLE 16 CM
{
id: "vanille_16cm",
slug: "vanille-bourbon-madagascar-16cm",
name: "Vanille de Madagascar 16 cm",
price: 4,
category: "Épices",
tags: ["vanille", "madagascar", "gourmet"],
description:
"Vanille Bourbon de Madagascar en gousse parfumée. Idéale pour pâtisserie, desserts maison et rhum arrangé. Qualité artisanale premium",
badges: ["Best-seller"],
short: "Gousse premium · 16 cm",
material: "Vanille Bourbon",
dimensions: "16 cm",
bundle: { qty: 5, price: 18 },
image: "/images/epices/vanille-16-cm.png",
},

// VANILLE 14 CM
{
id: "vanille_14cm",
slug: "vanille-bourbon-madagascar-14cm",
name: "Vanille de Madagascar 14 cm",
price: 3.5,
category: "Épices",
tags: ["vanille", "madagascar", "gourmet"],
description:
"Vanille Bourbon de Madagascar 14 cm, aromatique et parfaite pour un usage quotidien en cuisine sucrée ou en infusion.",
short: "Format découverte · 14 cm",
material: "Vanille Bourbon",
dimensions: "14 cm",
bundle: { qty: 5, price: 15 },
image: "/images/epices/vanille-14-cm.png",
}, 
// POIVRE SAUVAGE
{
id: "poivre_sauvage_40g",
slug: "poivre-sauvage-madagascar-voatsiperifery-40g",
name: "Poivre sauvage de Madagascar 40 g",
price: 12,
category: "Épices",
tags: ["poivre", "madagascar", "épices", "voatsiperifery"],
description:
"Poivre sauvage Voatsiperifery de Madagascar. Parfum intense et unique, idéal pour relever vos plats, poissons, viandes et sauces.",
short: "Voatsiperifery · 40 g",
material: "Poivre sauvage",
dimensions: "40 g",
image: "/images/epices/poivre-sauvage-40g.png",
},

// COMBAVA
{
id: "combava_40g",
slug: "combava-madagascar-40g",
name: "Combava de Madagascar 40 g",
price: 9,
category: "Épices",
tags: ["combava", "madagascar", "épices", "agrumes"],
description:
"Combava de Madagascar au parfum citronné intense. Idéal pour cuisine exotique, poissons, sauces et desserts.",
short: "Parfum citronné · 40 g",
material: "Combava",
dimensions: "40 g",
image: "/images/epices/combava-40g.png",
}, 
// PACK DÉCOUVERTE
{
id: "pack_madagascar",
slug: "pack-decouverte-madagascar",
name: "Pack découverte Madagascar",
price: 22.9,
category: "Épices",
tags: ["pack", "vanille", "poivre", "combava", "madagascar"],
description:
"Découvrez le meilleur de Madagascar avec ce pack : vanille Bourbon, poivre sauvage et combava. Idéal pour tester ou offrir.",
badges: ["Best-seller"],
short: "Vanille + Poivre + Combava",
material: "Épices naturelles",
dimensions: "3 produits",
image: "/images/epices/pack-madagascar.png",
}, 
// BIJOUX NOSY KANTO - acier inoxydable & pierres naturelles
{
  id: "bijou_nosykanto_cloche",
  slug: "boucles-cloche-nosy-kanto",
  name: "Boucles Sélène",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierres naturelles . Acier inoxydable",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucle-cloche.png",
  description:  "Boucles Sélène faites main à Madagascar. Leur silhouette délicate associe l’acier inoxydable aux pierres naturelles pour un bijou élégant et lumineux. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_feuille",
  slug: "boucles-feuille-nosy-kanto",
  name: "Boucles Alizée",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierres naturelles . Acier inoxydable",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-feuille-or.png",
  description:  "Inspirées par la nature malgache, les boucles Alizée sont réalisées à la main en acier inoxydable et pierres naturelles. Un bijou léger et raffiné, créé exclusivement pour Nosy Kanto.",
},
{
  id: "bijou_nosykanto_fleur_rose",
  slug: "boucles-fleur-rose-nosy-kanto",
  name: "Boucles Pivoine",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierres naturelles . Acier inoxydable",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-fleur-rose.png",
  description: "Délicates et féminines, les boucles Pivoine sont confectionnées à la main à Madagascar en acier inoxydable et pierres naturelles. Une création florale exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_jaspe",
  slug: "boucles-jaspe-nosy-kanto",
  name: "Boucles Sienna",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "jaspe", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Jaspe naturel · Acier inoxydable",
  material: "Acier inoxydable & jaspe",
  image: "/images/nosykanto/boucles-jaspe.png",
  description:  "Chaleureuses et élégantes, les boucles Sienna associent l’acier inoxydable au jaspe naturel. Réalisées à la main à Madagascar, elles apportent une touche authentique et raffinée. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_maya",
  slug: "boucles-maya-nosy-kanto",
  name: "Boucles Maya",
  price: 24,
  stock: 2,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierres naturelles . Acier inoxydable",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-maya.png",
  description: "Les boucles Maya associent pierres naturelles et acier inoxydable dans une création délicate réalisée à la main à Madagascar. Un bijou original et lumineux, exclusif à Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perle_rose",
  slug: "boucles-perle-rose-nosy-kanto",
  name: "Boucles Rosalie",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perle", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Perle rose · Acier inoxydable",
  material: "Acier inoxydable & perle",
  image: "/images/nosykanto/boucles-perle-rose.png",
  description:  "Douces et lumineuses, les boucles Rosalie associent une délicate perle rose à l’acier inoxydable. Confectionnées à la main à Madagascar, elles apportent une touche élégante et féminine. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_coquillage",
  slug: "boucles-perles-coquillage-nosy-kanto",
  name: "Boucles Lagune",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "coquillage", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles · Coquillage . Acier inoxydable",
  material: "Acier inoxydable, perles & coquillage",
  image: "/images/nosykanto/boucles-perles-coquillage.png",
  description:  "Inspirées par l’océan, les boucles Lagune mêlent perles et coquillage à l’acier inoxydable. Réalisées à la main à Madagascar, elles apportent une touche naturelle et solaire. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_violet",
  slug: "boucles-violet-nosy-kanto",
  name: "Boucles Améthyste",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierre violette · Acier inoxydable",
  material: "Acier inoxydable & pierre naturelle",
  image: "/images/nosykanto/boucles-violet.png",
  description:  "Les boucles Améthyste associent une pierre naturelle aux nuances violettes à l’acier inoxydable. Confectionnées à la main à Madagascar, elles offrent une allure élégante et colorée. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_blanc",
  slug: "boucles-perles-blanches-nosy-kanto",
  name: "Boucles Ivoire",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles blanches · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles-blanc.png",
  description: "Élégantes et lumineuses, les boucles Ivoire associent des perles blanches à l’acier inoxydable. Réalisées à la main à Madagascar, elles offrent un style délicat et intemporel. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_noir",
  slug: "boucles-perles-noires-nosy-kanto",
  name: "Boucles Ebène",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles noires · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles-noir.png",
  description: "Élégantes et contrastées, les boucles Ébène associent des perles noires à l’acier inoxydable. Réalisées à la main à Madagascar, elles apportent une touche chic et intemporelle. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles",
  slug: "boucles-perles-nosy-kanto",
  name: "Boucles Eclat",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles.png",
  description:  "Délicates et lumineuses, les boucles Éclat associent des perles à l’acier inoxydable. Confectionnées à la main à Madagascar, elles offrent une élégance naturelle facile à porter. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_rose",
  slug: "boucles-rose-nosy-kanto",
  name: "Boucles Azalée",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierre rose · Acier inoxydable",
  material: "Acier inoxydable & pierre naturelle",
  image: "/images/nosykanto/boucles-rose.png",
  description: "Les boucles Azalée associent une pierre naturelle aux nuances roses à l’acier inoxydable. Réalisées à la main à Madagascar, elles apportent une touche douce et colorée. Création exclusive Nosy Kanto.",
},

];

export function getProductBySlug(slug: string): Product | undefined {
return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
return PRODUCTS.find((p) => p.id === id);
}

export function getCategories(): Product["category"][] {
return Array.from(new Set(PRODUCTS.map((p) => p.category)));
} 
