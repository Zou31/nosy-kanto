// app/data/products.ts

export type ProductVariant = {
id: string;
color: string;
image: string;
imageHover?: string;
};

export type Product = {
id: string;
slug: string;
name: string;
price: number;
image: string;
imageHover?: string;
category: "Bijoux" | "Sacs & accessoires" | "Décoration" | "Épices";
tags: string[];
description: string;

badges?: ("Nouveauté" | "Best-seller" | "Stock limité")[];
short?: string;
material?: string;
dimensions?: string;

variants?: ProductVariant[];

bundle?: { qty: number; price: number };
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

variants: [
{
id: "tisse-bleu",
color: "Bleu",
image: "/images/decoration/set-table-tisse/bleu-1.jpg",
imageHover: "/images/decoration/set-table-tisse/bleu-2.jpg",
},
{
id: "tisse-carreaux-multi",
color: "Carreaux multi",
image: "/images/decoration/set-table-tisse/carreaux-multi-1.jpg",
imageHover: "/images/decoration/set-table-tisse/carreaux-multi-2.jpg",
},
{
id: "tisse-jaune",
color: "Jaune",
image: "/images/decoration/set-table-tisse/jaune-1.jpg",
imageHover: "/images/decoration/set-table-tisse/jaune-2.jpg",
},
{
id: "tisse-vert",
color: "Vert",
image: "/images/decoration/set-table-tisse/vert-1.jpg",
imageHover: "/images/decoration/set-table-tisse/vert-2.jpg",
},
{
id: "tisse-orange",
color: "Orange",
image: "/images/decoration/set-table-tisse/orange-1.jpg",
imageHover: "/images/decoration/set-table-tisse/orange-2.jpg",
},
{
id: "tisse-noir",
color: "Noir",
image: "/images/decoration/set-table-tisse/noir-1.jpg",
imageHover: "/images/decoration/set-table-tisse/noir-2.jpg",
},
{
id: "tisse-multicolore",
color: "Multicolore",
image: "/images/decoration/set-table-tisse/multicolore-1.jpg",
imageHover: "/images/decoration/set-table-tisse/multicolore-2.jpg",
},
{
id: "tisse-carre-violet",
color: "Carré violet",
image: "/images/decoration/set-table-tisse/carre-violet-1.jpg",
imageHover: "/images/decoration/set-table-tisse/carre-violet-2.jpg",
},
],

image: "/images/decoration/set-table-tisse/multicolore-1.jpg",
imageHover: "/images/decoration/set-table-tisse/multicolore-2.jpg",
},

// SAC 1 - Kanto Terra (anse cuir)
{
id: "sac_kanto_terra",
slug: "sac-raphia-fait-main-kanto-terra",
name: "Sac en raphia fait main - Kanto Terra",
price: 70,
category: "Sacs & accessoires",
tags: ["sac raphia", "fait main", "madagascar","sac été"],
description:
"Sac en raphia fait main à Madagascar avec anse en cuir. Léger, naturel et élégant, idéal pour un usage quotidien ou estival.",
badges: ["Nouveauté", "Stock limité"], 

variants: [
{
id: "terra-clair",
color: "Marron clair",
image: "/images/sacs/terra-clair.png",
},
{
id: "terra-fonce",
color: "Marron foncé",
image: "/images/sacs/terra-fonce.png",
},
],

image: "/images/sacs/terra-clair.png",
},

// SAC 2 - Kanto Ravo (anse raphia)
{
id: "sac_kanto_ravo",
slug: "sac-raphia-souple-kanto-ravo",
name: "Sac en raphia souple fait main - Kanto Ravo",
price: 65,
category: "Sacs & accessoires",
tags: ["raphia", "souple", "fait main"],
description:
"Sac en raphia souple avec anse tressée, léger et pratique au quotidien.",
badges: ["Nouveauté", "Stock limité"], 

variants: [
{
id: "ravo-clair",
color: "Marron clair",
image: "/images/sacs/ravo-clair.png",
},
{
id: "ravo-fonce",
color: "Marron foncé",
image: "/images/sacs/ravo-fonce.png",
},
],

image: "/images/sacs/ravo-clair.png",
},

// SAC 3 - Kanto Lova
{
id: "sac_kanto_lova",
slug: "sac-raphia-design-kanto-lova",
name: "Sac en raphia design fait main - Kanto Lova",
price: 89,
category: "Sacs & accessoires",
tags: ["raphia", "design", "fait main"],
description:
"Sac en raphia design fait main à Madagascar.Pièce unique, élégante et structurée, parfaite pour un style naturel et chic.",

variants: [
{
id: "lova-clair",
color: "Marron clair",
image: "/images/sacs/lova-clair.png",
},
{
id: "lova-fonce",
color: "Marron foncé",
image: "/images/sacs/lova-fonce.png",
},
],

image: "/images/sacs/lova-clair.png",
},

// BIJOUX CORNE DE ZÉBU

// GOUTTE
{
id: "bijoux_zebu_goutte",
slug: "boucles-goutte-zebu",
name: "Boucles goutte en corne de zébu",
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
name: "Boucles feuille en corne de zébu",
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
name: "Boucles trapèze en corne de zébu",
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
name: "Boucles carré en corne de zébu",
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
name: "Boucles rectangle en corne de zébu",
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
name: "Boucles rondes en corne de zébu",
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
image: "/images/epices/vanille-16cm.png",
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
image: "/images/epices/vanille-14cm.png",
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
  name: "Boucles cloche Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Acier inoxydable · Pierres naturelles",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucle-cloche.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierres naturelles. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_feuille",
  slug: "boucles-feuille-nosy-kanto",
  name: "Boucles feuille Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Acier inoxydable · Pierres naturelles",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-feuille.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierres naturelles. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_fleur_rose",
  slug: "boucles-fleur-rose-nosy-kanto",
  name: "Boucles fleur rose Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Acier inoxydable · Pierres naturelles",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-fleur-rose.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierres naturelles. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_jaspe",
  slug: "boucles-jaspe-nosy-kanto",
  name: "Boucles jaspe Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "jaspe", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Jaspe · Acier inoxydable",
  material: "Acier inoxydable & jaspe",
  image: "/images/nosykanto/boucles-jaspe.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierre naturelle jaspe. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_maya",
  slug: "boucles-maya-nosy-kanto",
  name: "Boucles Maya Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Acier inoxydable · Pierres naturelles",
  material: "Acier inoxydable & pierres naturelles",
  image: "/images/nosykanto/boucles-maya.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierres naturelles. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perle_rose",
  slug: "boucles-perle-rose-nosy-kanto",
  name: "Boucles perle rose Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perle", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Perle rose · Acier inoxydable",
  material: "Acier inoxydable & perle",
  image: "/images/nosykanto/boucles-perle-rose.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec perle naturelle. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_coquillage",
  slug: "boucles-perles-coquillage-nosy-kanto",
  name: "Boucles perles coquillage Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "coquillage", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles · Coquillage",
  material: "Acier inoxydable, perles & coquillage",
  image: "/images/nosykanto/boucles-perles-coquillage.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec perles et coquillage. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_violet",
  slug: "boucles-violet-nosy-kanto",
  name: "Boucles violet Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierre violette · Acier inoxydable",
  material: "Acier inoxydable & pierre naturelle",
  image: "/images/nosykanto/boucles-violet.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierre naturelle violette. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_blanc",
  slug: "boucles-perles-blanches-nosy-kanto",
  name: "Boucles perles blanches Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles blanches · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles-blanc.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec perles blanches. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles_noir",
  slug: "boucles-perles-noires-nosy-kanto",
  name: "Boucles perles noires Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles noires · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles-noir.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec perles noires. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_perles",
  slug: "boucles-perles-nosy-kanto",
  name: "Boucles perles Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "perles", "acier inoxydable", "fait main", "madagascar"],
  short: "Perles · Acier inoxydable",
  material: "Acier inoxydable & perles",
  image: "/images/nosykanto/boucles-perles.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec perles. Création exclusive Nosy Kanto.",
},
{
  id: "bijou_nosykanto_rose",
  slug: "boucles-rose-nosy-kanto",
  name: "Boucles rose Nosy Kanto",
  price: 24.9,
  category: "Bijoux",
  tags: ["bijoux nosy kanto", "acier inoxydable", "pierres naturelles", "fait main", "madagascar"],
  short: "Pierre rose · Acier inoxydable",
  material: "Acier inoxydable & pierre naturelle",
  image: "/images/nosykanto/boucles-rose.png",
  description: "Boucles faites main à Madagascar en acier inoxydable avec pierre naturelle rose. Création exclusive Nosy Kanto.",
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
