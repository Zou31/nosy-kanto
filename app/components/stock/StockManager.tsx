"use client";

import { useState } from "react";

import { useERP } from "../../context/ERPContext";
import type {
  StockItem,
  StockLocation,
} from "../../data/stock";

import type {
  StockMovement,
} from "../../data/stockMovements";

import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";
import Modal from "../ui/Modal";

import { getLowStock } from "../../lib/stock";
import { createStockMovement } from "../../lib/stockMovements";

import DashboardCards from "../dashboard/DashboardCards";
import StockList from "./StockList";
import TransferStockForm from "./TransferStockForm";
import StockMovementsList from "./StockMovementsList";
import SellStockForm from "./SellStockForm";
import AdjustStockForm from "./AdjustStockForm";
import {
  sellSalon,
  sellOnline,
  marketDeparture,
  marketReturn,
  adjustStock,
  executeStockTransfer,
} from "../../lib/stockActions";

import NewLocationForm from "./NewLocationForm";

import {
  getTotalStock,
  getTotalProducts,
  getLowStockCount,
} from "../../lib/dashboard";

async function syncLocationToSupabase(
  name: string
) {
  try {
    const response = await fetch(
      "/api/erp/locations/sync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(
        "Erreur synchro emplacement Supabase :",
        result
      );
    }
  } catch (error) {
    console.error(
      "Erreur réseau emplacement Supabase :",
      error
    );
  }
}

export default function StockManager() {
  const {
  stock,
  setStock,
  movements,
  setMovements,
  locations,
  setLocations,
} = useERP();

  const [search, setSearch] = useState("");
  const [productToTransfer, setProductToTransfer] =
    useState<string | null>(null);
    const [productToSell, setProductToSell] =
  useState<string | null>(null);
  const [productToOnlineSell, setProductToOnlineSell] =
  useState<string | null>(null);
  const [productToMarket, setProductToMarket] =
  useState<string | null>(null);
  const [productToMarketReturn, setProductToMarketReturn] =
  useState<string | null>(null);
  const [productToAdjust, setProductToAdjust] =
  useState<string | null>(null);
  const [isNewLocationOpen, setIsNewLocationOpen] =
  useState(false);

  const [transferError, setTransferError] = useState("");
  const [sellError, setSellError] = useState("");
  const [onlineSellError, setOnlineSellError] = useState("");
  const [marketError, setMarketError] = useState("");
  const [marketReturnError, setMarketReturnError] = useState("");
  const [adjustError, setAdjustError] = useState("");
  const [movementFilter, setMovementFilter] = useState<
  StockMovement["type"] | "Tous"
>("Tous");

  const filteredStock = stock.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = getLowStock(stock);

  const totalStock = getTotalStock(stock);
  const totalProducts = getTotalProducts(stock);
  const lowStockCount = getLowStockCount(stock);


  function getSelectedProduct(stockKey: string | null) {
  if (!stockKey) return null;

  const [productId, variantId] = stockKey.split("::");

  return (
    stock.find(
      (item) =>
        item.productId === productId &&
        (
          variantId === undefined ||
          item.variantId === variantId
        )
    ) ?? null
  );
}

  const selectedProduct =
  getSelectedProduct(productToTransfer);

const selectedProductToSell =
  getSelectedProduct(productToSell);

const selectedProductToOnlineSell =
  getSelectedProduct(productToOnlineSell);

const selectedProductToMarket =
  getSelectedProduct(productToMarket);

const selectedProductToMarketReturn =
  getSelectedProduct(productToMarketReturn);

const selectedProductToAdjust =
  getSelectedProduct(productToAdjust);

async function syncMovementToSupabase(
  movement: StockMovement
) {
  try {
    const response = await fetch(
      "/api/erp/movements/sync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movement),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(
        "Erreur synchro mouvement Supabase :",
        result
      );
    }
  } catch (error) {
    console.error(
      "Erreur réseau mouvement Supabase :",
      error
    );
  }
}

async function syncStockToSupabase(
  stockToSync: StockItem[]
) {
  try {
    const response = await fetch(
      "/api/erp/stock/sync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: stockToSync,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      console.error(
        "Erreur synchro stock Supabase :",
        result
      );
    }
  } catch (error) {
    console.error(
      "Erreur réseau stock Supabase :",
      error
    );
  }
}

function handleOpenSell(productId: string) {
  setSellError("");
  setProductToSell(productId);
}


  function handleOpenTransfer(productId: string) {
    setTransferError("");
    setProductToTransfer(productId);
  }

  function handleTransfer(
  from: StockLocation,
  to: StockLocation,
  quantity: number,
  reason: string
) {
  if (!productToTransfer || !selectedProduct) return;

  const [productId, variantId] =
  productToTransfer.split("::");

const result = executeStockTransfer(
  stock,
  productId,
  from,
  to,
  quantity,
  variantId
);

  if (result.error) {
    setTransferError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

 const movement = createStockMovement(
  productId,
  selectedProduct.name,
  from,
  to,
  quantity,
  "Transfert",
  reason,
  variantId
);

  setMovements((previous) => [movement, ...previous]);

  syncMovementToSupabase(movement);

  setTransferError("");
  setProductToTransfer(null);
}

  const filteredMovements =
  movementFilter === "Tous"
    ? movements
    : movements.filter(
        (movement) =>
          movement.type === movementFilter
      );

function handleSellSalon(
  quantity: number,
  reason: string
) {
  if (!productToSell || !selectedProductToSell) return;

 const [productId, variantId] =
  productToSell.split("::");

const result = sellSalon(
  stock,
  productId,
  quantity,
  variantId
);

  if (result.error) {
    setSellError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

  const movement = createStockMovement(
  productId,
  selectedProductToSell.name,
  "Salon",
  "Client",
  quantity,
  "Vente salon",
  reason,
  variantId
);

  setMovements((previous) => [movement, ...previous]);

  syncMovementToSupabase(movement);

  setSellError("");
  setProductToSell(null);
}

function handleOpenOnlineSell(productId: string) {
  setOnlineSellError("");
  setProductToOnlineSell(productId);
}

function handleOnlineSell(
  quantity: number,
  reason: string
) {
  if (!productToOnlineSell || !selectedProductToOnlineSell) return;

  const [productId, variantId] =
  productToOnlineSell.split("::");

const result = sellOnline(
  stock,
  productId,
  quantity,
  variantId
);

  if (result.error) {
    setOnlineSellError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

  const movement = createStockMovement(
  productId,
  selectedProductToOnlineSell.name,
  "Maison",
  "Client",
  quantity,
  "Vente en ligne",
  reason,
  variantId
);

  setMovements((previous) => [movement, ...previous]);

  syncMovementToSupabase(movement);

  setOnlineSellError("");
  setProductToOnlineSell(null);
}

function handleMarketDeparture(productId: string) {
  setMarketError("");
  setProductToMarket(productId);
}

function handleMarketDepartureSubmit(
  quantity: number,
  reason: string
) {
  if (!productToMarket || !selectedProductToMarket) return;

  const [productId, variantId] =
    productToMarket.split("::");

  const result = marketDeparture(
    stock,
    productId,
    quantity,
    variantId
  );

  if (result.error) {
    setMarketError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

  const movement = createStockMovement(
    productId,
    selectedProductToMarket.name,
    "Maison",
    "Marché",
    quantity,
    "Départ marché",
    reason,
    variantId
  );

  setMovements((previous) => [
    movement,
    ...previous,
  ]);

  syncMovementToSupabase(movement);

  setMarketError("");
  setProductToMarket(null);
}

function handleMarketReturn(productId: string) {
  setMarketReturnError("");
  setProductToMarketReturn(productId);
}

function handleMarketReturnSubmit(
  quantity: number,
  reason: string
) {
  if (!productToMarketReturn || !selectedProductToMarketReturn) return;

  const [productId, variantId] =
  productToMarketReturn.split("::");

const result = marketReturn(
  stock,
  productId,
  quantity,
  variantId
);

  if (result.error) {
    setMarketReturnError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

  const movement = createStockMovement(
  productId,
  selectedProductToMarketReturn.name,
  "Marché",
  "Maison",
  quantity,
  "Retour marché",
  reason,
  variantId
);

  setMovements((previous) => [movement, ...previous]);

  syncMovementToSupabase(movement);

  setMarketReturnError("");
  setProductToMarketReturn(null);
}
function handleAdjust(productId: string) {
  setAdjustError("");
  setProductToAdjust(productId);
}
function handleAdjustSubmit(
  location: StockLocation,
  quantity: number,
  reason: string,
  mode: "Ajouter" | "Retirer"
) {
  if (!productToAdjust || !selectedProductToAdjust) return;

  const [productId, variantId] =
  productToAdjust.split("::");

const result = adjustStock(
  stock,
  productId,
  location,
  quantity,
  mode,
  variantId
);

  if (result.error) {
    setAdjustError(result.error);
    return;
  }

  setStock(result.stock);

  syncStockToSupabase(result.stock);

 const movement = createStockMovement(
  productId,
  selectedProductToAdjust.name,
  location,
  location,
  quantity,
  "Ajustement",
  reason,
  variantId
);

  setMovements((previous) => [movement, ...previous]);

  syncMovementToSupabase(movement);

  setAdjustError("");
  setProductToAdjust(null);
}

  return (
  <div>
    <div className="mb-6">
      <ActionButton
        icon="📦"
        label="Nouvel emplacement"
        onClick={() => setIsNewLocationOpen(true)}
      />
    </div>

    <DashboardCards
      totalStock={totalStock}
      totalProducts={totalProducts}
      lowStockCount={lowStockCount}
    />

    <div className="mb-6 flex flex-wrap gap-2">
      {locations.map((location) => (
        <span
          key={location}
          className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-700"
        >
          📍 {location}
        </span>
      ))}
    </div>

    <SearchBar
      value={search}
      onChange={setSearch}
      placeholder="Rechercher un produit..."
    />

    <p className="mt-6 text-neutral-600">
      {filteredStock.length} article(s)
    </p>

    <p className="mt-2 font-medium text-red-600">
      ⚠️ {lowStock.length} stock(s) en alerte
    </p>

    <p className="mt-2 text-sm text-neutral-600">
      🔁 {movements.length} mouvement(s) enregistré(s)
    </p>

    <div className="mt-8">
      <StockList
        stock={filteredStock}
        onTransfer={handleOpenTransfer}
        onSell={handleOpenSell}
        onOnlineSell={handleOpenOnlineSell}
        onMarketDeparture={handleMarketDeparture}
        onMarketReturn={handleMarketReturn}
        onAdjust={handleAdjust}
      />
    </div>

    <div className="mt-10">
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          "Tous",
          "Transfert",
          "Vente salon",
          "Vente en ligne",
          "Départ marché",
          "Retour marché",
          "Ajustement",
        ].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() =>
              setMovementFilter(
                filter as StockMovement["type"] | "Tous"
              )
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              movementFilter === filter
                ? "bg-[#4A2B1A] text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-[#4A2B1A]">
        🔁 Journal des mouvements
      </h2>

      <StockMovementsList movements={filteredMovements} />
    </div>

    {productToTransfer && selectedProduct && (
      <Modal
        title="🚚 Transférer du stock"
        onClose={() => setProductToTransfer(null)}
      >
        <TransferStockForm
          productName={selectedProduct.name}
          error={transferError}
          locations={locations}
          onTransfer={handleTransfer}
        />
      </Modal>
    )}

    {productToSell && selectedProductToSell && (
      <Modal
        title="💇 Vente Salon"
        onClose={() => setProductToSell(null)}
      >
        <SellStockForm
          productName={selectedProductToSell.name}
          error={sellError}
          onSell={handleSellSalon}
        />
      </Modal>
    )}

    {productToOnlineSell && selectedProductToOnlineSell && (
      <Modal
        title="🌐 Vente en ligne"
        onClose={() => setProductToOnlineSell(null)}
      >
        <SellStockForm
          productName={selectedProductToOnlineSell.name}
          error={onlineSellError}
          onSell={handleOnlineSell}
        />
      </Modal>
    )}

    {productToMarket && selectedProductToMarket && (
      <Modal
        title="🛍️ Départ marché"
        onClose={() => setProductToMarket(null)}
      >
        <SellStockForm
          productName={selectedProductToMarket.name}
          error={marketError}
          onSell={handleMarketDepartureSubmit}
        />
      </Modal>
    )}

    {productToMarketReturn && selectedProductToMarketReturn && (
      <Modal
        title="↩️ Retour marché"
        onClose={() => setProductToMarketReturn(null)}
      >
        <SellStockForm
          productName={selectedProductToMarketReturn.name}
          error={marketReturnError}
          onSell={handleMarketReturnSubmit}
        />
      </Modal>
    )}

    {productToAdjust && selectedProductToAdjust && (
      <Modal
        title="⚙️ Ajuster le stock"
        onClose={() => setProductToAdjust(null)}
      >
        <AdjustStockForm
          productName={selectedProductToAdjust.name}
          error={adjustError}
          onAdjust={handleAdjustSubmit}
        />
      </Modal>
    )}

    {isNewLocationOpen && (
      <Modal
        title="📦 Nouvel emplacement"
        onClose={() => setIsNewLocationOpen(false)}
      >
        <NewLocationForm
          onCreate={(name) => {
            const alreadyExists = locations.some(
              (location) =>
                location.toLowerCase() === name.toLowerCase()
            );

            if (alreadyExists) return;

            setLocations((previous) => [...previous, name]);
            syncLocationToSupabase(name);

            setStock((previous) => {
              const stockKeys = Array.from(
  new Set(
    previous.map((item) =>
      item.variantId
        ? `${item.productId}::${item.variantId}`
        : item.productId
    )
  )
);

           const newItems: StockItem[] = stockKeys.map(
  (stockKey) => {
    const [productId, variantId] =
      stockKey.split("::");

    const reference = previous.find(
      (item) =>
        item.productId === productId &&
        (
          variantId === undefined ||
          item.variantId === variantId
        )
    );

    return {
      id: `${productId}${
        variantId ? `-${variantId}` : ""
      }-${name
        .toLowerCase()
        .replace(/\s+/g, "-")}`,

      productId,

      variantId,

      name:
        reference?.name ??
        productId,

      location: name,
      quantity: 0,
      alertLevel:
        reference?.alertLevel ?? 0,

      updatedAt: new Date()
        .toISOString()
        .slice(0, 10),
    };
  }
);

              return [...previous, ...newItems];
            });

            setIsNewLocationOpen(false);
          }}
        />
      </Modal>
    )}
  </div>
);
}
