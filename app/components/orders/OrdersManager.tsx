"use client";

import { useState } from "react";

import { ORDERS, type Order } from "../../data/orders";
import type { OrderFormData } from "../../types/orderForms";

import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";
import Modal from "../ui/Modal";
import ConfirmModal from "../ui/ConfirmModal";

import OrderForm from "./OrderForm";
import OrdersList from "./OrdersList";
import { searchOrders } from "../../lib/orders";

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  function handleCreate(data: OrderFormData) {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      customer: data.customer,
      items: data.items
        .split("\n")
        .filter((item) => item.trim() !== ""),
      status: data.status,
      paid: data.paid,
      labelPrinted: false,
      date: new Date().toLocaleDateString("fr-FR"),
    };

    setOrders((previous) => [newOrder, ...previous]);
    setIsOpen(false);
  }

  function handleSave(data: OrderFormData) {
    if (!editingOrder) {
      handleCreate(data);
      return;
    }

    setOrders((previous) =>
      previous.map((order) =>
        order.id === editingOrder.id
          ? {
              ...order,
              customer: data.customer,
              items: data.items
                .split("\n")
                .filter((item) => item.trim() !== ""),
              status: data.status,
              paid: data.paid,
            }
          : order
      )
    );

    setEditingOrder(null);
    setIsOpen(false);
  }

  function handleEdit(id: string) {
    const order = orders.find((order) => order.id === id);

    if (!order) return;

    setEditingOrder(order);
    setIsOpen(true);
  }

  function handleDelete(id: string) {
    const order = orders.find((order) => order.id === id);

    if (!order) return;

    setOrderToDelete(order);
    setIsDeleteOpen(true);
  }

  function confirmDelete() {
    if (!orderToDelete) return;

    setOrders((previous) =>
      previous.filter((order) => order.id !== orderToDelete.id)
    );

    setOrderToDelete(null);
    setIsDeleteOpen(false);
  }

  function handleCloseModal() {
    setEditingOrder(null);
    setIsOpen(false);
  }

  const filteredOrders = searchOrders(orders, search);

  return (
    <div>
      <div className="mb-6">
        <ActionButton
          icon="📋"
          label="Nouvelle commande"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher une commande..."
      />

      <p className="mb-6 text-neutral-600">
        {filteredOrders.length} commande(s)
      </p>

      <OrdersList
        orders={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isOpen && (
        <Modal
          title={editingOrder ? "✏️ Modifier la commande" : "📋 Nouvelle commande"}
          onClose={handleCloseModal}
        >
          <OrderForm
            onCreate={handleSave}
            initialData={
              editingOrder
                ? {
                    customer: editingOrder.customer,
                    customerEmail: "",
                    items: editingOrder.items.join("\n"),
                    total: 0,
                    status: editingOrder.status,
                    paid: editingOrder.paid,
                  }
                : undefined
            }
          />
        </Modal>
      )}

      {isDeleteOpen && orderToDelete && (
        <ConfirmModal
          title="Supprimer la commande"
          message={`Voulez-vous vraiment supprimer la commande #${orderToDelete.id} ?`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setOrderToDelete(null);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
}
