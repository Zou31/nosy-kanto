# Référentiels officiels Nosy Kanto

Ce document contient l'ensemble des référentiels utilisés par l'ERP Nosy Kanto.

Les référentiels permettent de normaliser les données et d'éviter les doublons lors de la création des produits.

Ils constituent la source officielle des listes utilisées par l'ERP (familles, catégories, collections, modèles, variantes, matières, couleurs, fournisseurs, artisans, etc.).

---

# Référentiels disponibles

- Familles
- Collections
- Catégories
- Modèles
- Variantes
- Matières
- Couleurs
- Dimensions
- Fournisseurs
- Artisans partenaires

---

## Règles des référentiels

- Chaque valeur possède un code stable.
- Le code ne doit jamais être modifié après sa mise en service.
- Une valeur inactive n'est pas supprimée : elle passe à `Actif = Non`.
- Les codes sont écrits en majuscules, sans espace ni accent.

# Familles

| Code | Nom | Actif | Description |
|------|-----|:-----:|-------------|
| ART | Artisanat | Oui | Produits artisanaux fabriqués à Madagascar. |
| BIJ | Bijoux | Oui | Bijoux réalisés par les artisans partenaires de Nosy Kanto. |
| FER | Ferblanterie | Oui | Créations artisanales en métal. |
| SAV | Saveurs de Madagascar | Oui | Vanille, épices et autres saveurs de Madagascar. |

---

# Collections

Les collections représentent une ligne de création ou un univers cohérent de produits.

| Code | Nom | Famille | Actif | Description |
|------|-----|----------|:-----:|-------------|
| NK | Nosy Kanto | Bijoux | Oui | Bijoux en acier inoxydable et pierres naturelles réalisés par un artisan partenaire. |
| ZEB | Zébu | Bijoux | Oui | Bijoux artisanaux réalisés en corne de zébu. |

---

# Catégories

Les catégories définissent le type de produit au sein d'une famille.

| Code | Nom | Famille | Actif | Description |
|------|-----|----------|:-----:|-------------|
| SAC | Sacs | Artisanat | Oui | Sacs et cabas artisanaux. |
| DEC | Décoration | Artisanat | Oui | Objets de décoration. |
| TAB | Art de la table | Artisanat | Oui | Articles destinés à la table. |
| ACC | Accessoires | Artisanat | Oui | Accessoires artisanaux. |
| BOU | Boucles d'oreilles | Bijoux | Oui | Boucles d'oreilles. |
| BRA | Bracelets | Bijoux | Oui | Bracelets. |
| COL | Colliers | Bijoux | Oui | Colliers. |
| BAG | Bagues | Bijoux | Oui | Bagues. |
| PEN | Pendentifs | Bijoux | Oui | Pendentifs. |
| AUT | Autres | Bijoux | Oui | Autres bijoux. |
| LUM | Luminaires | Ferblanterie | Oui | Lampes, suspensions et luminaires. |
| MUR | Décoration murale | Ferblanterie | Oui | Décoration murale en métal. |
| SCO | Sculptures | Ferblanterie | Oui | Sculptures artisanales. |
| OBJ | Objets décoratifs | Ferblanterie | Oui | Objets décoratifs en métal. |
| TBF | Art de la table | Ferblanterie | Oui | Articles de table en métal. |
| VAN | Vanille | Saveurs de Madagascar | Oui | Vanille Bourbon de Madagascar. |
| POI | Poivres | Saveurs de Madagascar | Oui | Poivres de Madagascar. |
| EPI | Épices | Saveurs de Madagascar | Oui | Épices de Madagascar. |
| COF | Coffrets | Saveurs de Madagascar | Oui | Coffrets cadeaux et assortiments. |

---

# Modèles

Les modèles représentent les designs officiels des produits Nosy Kanto.

| Code | Nom | Catégorie | Actif | Description |
|------|-----|-----------|:-----:|-------------|
| TER | Terra | Sacs | Oui | Modèle de sac Terra. |
| LOV | Lova | Sacs | Oui | Modèle de sac Lova. |
| RAV | Ravo | Sacs | Oui | Modèle de sac Ravo. |
