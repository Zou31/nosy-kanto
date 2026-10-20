"use client";

import { useState } from "react";
import { createClient } from "../../utils/supabase/client";


export default function RetractationPage() {
  const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (isSubmitting) return;
  setIsSubmitting(true);

  const form = event.currentTarget;
  const formData = new FormData(form);


const firstName = String(formData.get("prenom") || "").trim();
const lastName = String(formData.get("nom") || "").trim();
const email = String(formData.get("email") || "").trim();
const orderNumber = String(formData.get("commande") || "").trim();
const products = String(formData.get("produits") || "").trim();
const confirmed =
  formData.get("confirmationRetractation") === "on";

  const supabase = createClient();

const { error } = await supabase
  .from("withdrawal_requests")
  .insert({
    first_name: firstName,
    last_name: lastName,
    email,
    order_number: orderNumber,
    products,
    confirmed,
  });

if (error) {
  console.error("Erreur rétractation :", {
  message: error.message,
  details: error.details,
  hint: error.hint,
  code: error.code,
});
setIsSubmitting(false);
  return;
}

const emailResponse = await fetch("/api/retractation", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    firstName,
    lastName,
    email,
    orderNumber,
    products,
  }),
});

if (!emailResponse.ok) {
  console.error("Erreur lors de la préparation de l’e-mail.");
  setIsSubmitting(false);
  return;
}

setSuccess(true);
form.reset();
setIsSubmitting(false);

  }

  return (
    <main className="bg-[#F8F3E9]">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-[#E8DDCE] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#B7791F]">
            Nosy Kanto
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#4A2B1A]">
            Exercer mon droit de rétractation
          </h1>

          <p className="mt-5 leading-relaxed text-neutral-600">
            Vous souhaitez vous rétracter concernant une commande passée
            sur Nosy Kanto ? Vous pouvez effectuer votre demande directement
            en ligne.
          </p>

          <p className="mt-4 leading-relaxed text-neutral-600">
            Remplissez le formulaire ci-dessous afin de nous permettre
            d’identifier votre commande et de traiter votre demande.
          </p>

           <form onSubmit={handleSubmit} className="mt-8 space-y-5">
  <div className="grid gap-5 sm:grid-cols-2">
    <div>
      <label
        htmlFor="prenom"
        className="mb-2 block text-sm font-medium text-[#4A2B1A]"
      >
        Prénom
      </label>
      <input
        id="prenom"
        name="prenom"
        type="text"
        required
        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#DAA520]"
      />
    </div>

    <div>
      <label
        htmlFor="nom"
        className="mb-2 block text-sm font-medium text-[#4A2B1A]"
      >
        Nom
      </label>
      <input
        id="nom"
        name="nom"
        type="text"
        required
        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#DAA520]"
      />
    </div>
  </div>

  <div>
    <label
      htmlFor="email"
      className="mb-2 block text-sm font-medium text-[#4A2B1A]"
    >
      Adresse e-mail utilisée pour la commande
    </label>
    <input
      id="email"
      name="email"
      type="email"
      required
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#DAA520]"
    />
  </div>

  <div>
    <label
      htmlFor="commande"
      className="mb-2 block text-sm font-medium text-[#4A2B1A]"
    >
      Numéro de commande
    </label>
    <input
      id="commande"
      name="commande"
      type="text"
      required
      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#DAA520]"
    />

     <div>
  <label
    htmlFor="produits"
    className="mb-2 block text-sm font-medium text-[#4A2B1A]"
  >
    Produit(s) concerné(s)
  </label>

  <textarea
    id="produits"
    name="produits"
    required
    rows={4}
    placeholder="Indiquez le ou les produits concernés par votre demande"
    className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-[#DAA520]"
  />

    <div className="rounded-xl bg-[#F8F3E9] p-4">
  <label className="flex items-start gap-3 text-sm text-neutral-700">
    <input
      type="checkbox"
      name="confirmationRetractation"
      required
      className="mt-1 h-4 w-4 accent-[#4A2B1A]"
    />

    <span>
      Je confirme vouloir exercer mon droit de rétractation pour le ou les
      produits indiqués ci-dessus.
    </span>
  </label>
</div>
</div>
  </div>
 <button
  type="submit"
  disabled={isSubmitting}
  className="w-full rounded-xl bg-[#4A2B1A] px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-[#5C3824] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting
    ? "Envoi de votre demande..."
    : "Confirmer ma rétractation"}
</button>

</form>
{success && (
  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
    <p className="font-semibold">
      Votre demande de rétractation a bien été enregistrée.
    </p>

    <p className="mt-2">
      Nous vous confirmons la réception de votre demande. Un accusé de
      réception vous sera adressé par e-mail.
    </p>
  </div>
)}

        </div>
      </section>
    </main>
  );
}

