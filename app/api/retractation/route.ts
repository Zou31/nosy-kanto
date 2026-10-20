import { Resend } from "resend";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, orderNumber, products } = body;

    if (
  typeof firstName !== "string" ||
  typeof lastName !== "string" ||
  typeof email !== "string" ||
  typeof orderNumber !== "string" ||
  typeof products !== "string" ||
  firstName.trim().length === 0 ||
  lastName.trim().length === 0 ||
  email.trim().length === 0 ||
  orderNumber.trim().length === 0 ||
  products.trim().length === 0 ||
  firstName.length > 100 ||
  lastName.length > 100 ||
  email.length > 254 ||
  orderNumber.length > 100 ||
  products.length > 2000
) {
  return Response.json(
    { error: "Informations invalides." },
    { status: 400 }
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {
  return Response.json(
    { error: "Adresse e-mail invalide." },
    { status: 400 }
  );
}

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeOrderNumber = escapeHtml(orderNumber);
    const safeProducts = escapeHtml(products);

    if (!firstName || !lastName || !email || !orderNumber || !products) {
      return Response.json(
        { error: "Informations manquantes." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Nosy Kanto <contact@nosykanto.com>",
      to: [email],
      bcc: ["nosykanto31@gmail.com"],
      subject: `Confirmation de votre rétractation – commande ${orderNumber.replace(/[\r\n]/g, " ").trim()}`,

      html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #4A2B1A;">
      Confirmation de votre demande de rétractation
    </h2>

    <p>Bonjour ${safeFirstName} ${safeLastName},</p>

    <p>
      Nous vous confirmons la réception de votre demande de rétractation
      concernant la commande <strong>${safeOrderNumber}</strong>.
    </p>

    <p>
      <strong>Produit(s) concerné(s) :</strong><br />
      ${safeProducts}
    </p>

    <p>
      Votre demande a bien été enregistrée par Nosy Kanto.
      Nous reviendrons vers vous si des informations complémentaires
      sont nécessaires pour son traitement.
    </p>

    <p>
      Cordialement,<br />
      <strong>L'équipe Nosy Kanto</strong><br />
      www.nosykanto.com
    </p>
  </div>
`,
});

    if (error) {
      console.error("Erreur Resend :", error);

      return Response.json(
        { error: "Impossible d’envoyer l’accusé de réception." },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Erreur API rétractation :", error);

    return Response.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
