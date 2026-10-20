"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import {
  PRODUCTS,
  type Product,
  type ProductVariant,
} from "../data/products";

import {
  STOCK,
  type StockItem,
  type StockLocation,
} from "../data/stock";

import {
  STOCK_MOVEMENTS,
  type StockMovement,
} from "../data/stockMovements";

type ERPContextValue = {
  isLoading: boolean;
  loadError: boolean;

  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;

  stock: StockItem[];
  setStock: Dispatch<SetStateAction<StockItem[]>>;

  movements: StockMovement[];
  setMovements: Dispatch<SetStateAction<StockMovement[]>>;

  locations: StockLocation[];
  setLocations: Dispatch<SetStateAction<StockLocation[]>>;
};

const ERPContext = createContext<ERPContextValue | null>(null);

type ERPProviderProps = {
  children: ReactNode;
};

type SupabaseVariant = {
  id: string;
  product_id: string;

  sku?: string | null;
  name?: string | null;
  color?: string | null;
  size?: string | null;

  price?: number | null;
  cost_price?: number | null;

  dimensions?: {
    lengthCm?: number;
    heightCm?: number;
    widthCm?: number;
  } | null;

  weight_grams?: number | null;

  stock?: number | null;
  stock_min?: number | null;

  status?: string | null;

  image?: string | null;
  image_hover?: string | null;
  images?: string[] | null;

  barcode?: string | null;
  location?: string | null;

  is_default?: boolean | null;
  sort_order?: number | null;
};

type SupabaseProduct = {
  id: string;

  seed_id?: string | null;
  sku?: string | null;
  reference_code?: string | null;

  slug: string;
  name: string;
  collection?: string | null;

  category?: string | null;
  status?: string | null;

  price?: number | null;
  cost_price?: number | null;

  stock?: number | null;
  stock_min?: number | null;

  image?: string | null;
  image_hover?: string | null;
  images?: string[] | null; 

  tags?: string[] | null;
description?: string | null;
short?: string | null;

// Référencement Google (SEO)
seo_title?: string | null;
seo_description?: string | null;

badges?: string[] | null;

  material?: string | null;
  dimensions?: string | null;

  weight_grams?: number | null;
  origin_country?: string | null;
  handmade?: boolean | null;
  artisan_partner?: string | null;

  bundle?: {
    qty: number;
    price: number;
  } | null;

  product_variants?: SupabaseVariant[];
};

type SupabaseStockItem = {
  product_id: string;
  variant_id?: string | null;
  location?: string | null;
  quantity?: number | null;
  alert_level?: number | null;
  updated_at?: string | null;
};

type SupabaseMovement = {
  id: string;
  product_id: string;
  variant_id?: string | null;

  product_name?: string | null;
  movement_type?: string | null;

  from_location?: string | null;
  to_location?: string | null;

  quantity?: number | null;
  reason?: string | null;

  movement_date?: string | null;
  movement_time?: string | null;

  created_at?: string | null;
};

type SupabaseLocation = {
  id: string;
  name: string;
};

function mapSupabaseProduct(
  product: SupabaseProduct
): Product {
  return {
    id: product.id,

    seedId: product.seed_id ?? undefined,
    sku: product.sku ?? undefined,
    referenceCode: product.reference_code ?? undefined,

    slug: product.slug,
    name: product.name,
    collection: product.collection ?? undefined,

    category: product.category as Product["category"],
    status: product.status as Product["status"],

    price: product.price ?? 0,
    costPrice: product.cost_price ?? undefined,

    stock: product.stock ?? undefined,
    stockMin: product.stock_min ?? undefined,

    image: product.image ?? "",
    imageHover: product.image_hover ?? undefined,
    images: product.images ?? [], 

    tags: product.tags ?? [],
    description: product.description ?? "",
    short: product.short ?? undefined,

  // Référencement Google (SEO)
    seoTitle: product.seo_title ?? undefined,
    seoDescription: product.seo_description ?? undefined,

    badges: product.badges as Product["badges"],

    material: product.material ?? undefined,
    dimensions: product.dimensions ?? undefined,

    weightGrams: product.weight_grams ?? undefined,
    originCountry: product.origin_country ?? undefined,
    handmade: product.handmade ?? false,
    artisanPartner: product.artisan_partner ?? undefined,

    bundle: product.bundle ?? undefined,

    variants: (product.product_variants ?? []).map(
      (variant) => ({
        id: variant.id,

        sku: variant.sku ?? undefined,
        name: variant.name ?? undefined,
        size: variant.size ?? undefined,
        color: variant.color ?? "",

        price: variant.price ?? undefined,
        costPrice: variant.cost_price ?? undefined,

        dimensions:
        variant.dimensions as ProductVariant["dimensions"],

        weightGrams: variant.weight_grams ?? undefined,

        stock: variant.stock ?? undefined,
        stockMin: variant.stock_min ?? undefined,
        status: variant.status as Product["status"],

        image: variant.image ?? "",
        imageHover: variant.image_hover ?? undefined,
        images: variant.images ?? [],

        barcode: variant.barcode ?? undefined,
        location: variant.location ?? undefined,

        isDefault: variant.is_default ?? undefined,
        sortOrder: variant.sort_order ?? undefined,
      })
    ),
  };
}


function mapSupabaseStockItem(
  item: SupabaseStockItem,
  products: Product[]
): StockItem {
  const product = products.find(
    (product) => product.id === item.product_id
  );

  const variant = product?.variants?.find(
    (variant) => variant.id === item.variant_id
  );

  const name = variant
    ? `${product?.name ?? ""} - ${variant.color}`
    : product?.name ?? "";

  return {
    id: `${item.product_id}-${item.variant_id ?? "simple"}-${item.location ?? "Maison"}`,
    productId: item.product_id,
    variantId: item.variant_id ?? undefined,
    name,
    location: (item.location ?? "Maison") as StockLocation,
    quantity: item.quantity ?? 0,
    alertLevel: item.alert_level ?? 0,
    updatedAt:
      item.updated_at ?? new Date().toISOString(),
  };
}

function mapSupabaseMovement(
  movement: SupabaseMovement
): StockMovement {
  return {
    id: movement.id,
    productId: movement.product_id,
    variantId: movement.variant_id ?? undefined,

    productName: movement.product_name ?? "",

    type:
      movement.movement_type as StockMovement["type"],

    from:
      movement.from_location as StockMovement["from"],

    to:
      movement.to_location as StockMovement["to"],

    quantity: movement.quantity ?? 0,
    reason: movement.reason ?? "",

    date: movement.movement_date ?? "",
    time: movement.movement_time ?? "",
  };
}

export function ERPProvider({
  children,
}: ERPProviderProps) {
 const [products, setProducts] =
  useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [stock, setStock] =
  useState<StockItem[]>([]);

useEffect(() => {
  let cancelled = false;

  async function loadFromSupabase() {
    try {
      setLoadError(false);
      const response = await fetch("/api/erp/load");

if (response.status === 401) {
  const publicResponse = await fetch("/api/shop/products");

  if (!publicResponse.ok) {
    throw new Error(
      `Erreur chargement catalogue public : ${publicResponse.status}`
    );
  }

  const publicData = await publicResponse.json();

  if (!publicData.ok || cancelled) {
    return;
  }

  const publicProducts = (
    publicData.products as SupabaseProduct[]
  ).map(mapSupabaseProduct);

  const publicStock = (
  publicData.stock as SupabaseStockItem[]
).map((item) =>
  mapSupabaseStockItem(
    item,
    publicProducts
  )
);

  setProducts(publicProducts);
  setStock(publicStock);

  console.log(
    "✅ Catalogue public chargé depuis Supabase",
    {
      products: publicProducts.length,
    }
  );

  return;
}

if (!response.ok) {
  throw new Error(
    `Erreur chargement ERP : ${response.status}`
  );
}

const data = await response.json();

      if (!data.ok || cancelled) {
        return;
      }

      const supabaseProducts = (
        data.products as SupabaseProduct[]
      ).map(mapSupabaseProduct);

      const supabaseStock = (
      data.stock as SupabaseStockItem[]
      ).map((item) =>
      mapSupabaseStockItem(
       item,
       supabaseProducts
       )
      );

      const supabaseMovements = (
      data.movements as SupabaseMovement[]
      ).map(mapSupabaseMovement);

      const supabaseLocations = (
      data.locations as SupabaseLocation[]
      ).map((location) => location.name as StockLocation);

      setProducts(supabaseProducts);

      setStock(supabaseStock);
      setMovements(supabaseMovements); 
      setLocations(supabaseLocations);

      console.log(
        "✅ ERP chargé depuis Supabase",
        {
          products: supabaseProducts.length,
          stock: supabaseStock.length,
          movements: supabaseMovements.length,
        }
      );
    } catch (error) {
      if (!cancelled) {
  setLoadError(true);
}
  console.error(
    "❌ Impossible de charger l’ERP depuis Supabase :",
    error
  );
} finally {
  if (!cancelled) {
    setIsLoading(false);
  }
}
  }

  loadFromSupabase();

  return () => {
    cancelled = true;
  };
}, []);

  const [movements, setMovements] =
  useState<StockMovement[]>([]);

  const [locations, setLocations] =
  useState<StockLocation[]>([]);

  const value = useMemo<ERPContextValue>(
    () => ({
      isLoading,
      loadError,
      products,
      setProducts,
      stock,
      setStock,
      movements,
      setMovements,
      locations,
      setLocations,
    }),
    [
      isLoading,
      products,
      stock,
      movements,
      locations,
    ]
  );

  return (
    <ERPContext.Provider value={value}>
      {children}
    </ERPContext.Provider>
  );
}

export function useERP() {
  const context = useContext(ERPContext);

  if (!context) {
    throw new Error(
      "useERP doit être utilisé à l’intérieur de ERPProvider."
    );
  }

  return context;
}
