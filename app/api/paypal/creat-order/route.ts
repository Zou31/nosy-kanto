import { NextResponse } from "next/server";

async function getPayPalAccessToken() {
  const baseUrl = process.env.PAYPAL_BASE_URL;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!baseUrl || !clientId || !secret) {
    throw new Error(
      "PayPal env manquantes (PAYPAL_BASE_URL / PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)"
    );
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`PayPal token error: ${txt.slice(0, 200)}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const { total } = (await req.json()) as { total: number };

    const amount = Number(total);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Total invalide" }, { status: 400 });
    }

    const baseUrl = process.env.PAYPAL_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: "PAYPAL_BASE_URL manquant" }, { status: 500 });
    }

    const token = await getPayPalAccessToken();

    const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount.toFixed(2),
            },
          },
        ],
      }),
    });

    const data = await res.json().catch(() => ({} as any));
    if (!res.ok || !data?.id) {
      return NextResponse.json(
        { error: data?.message || "Erreur PayPal (create order)", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur serveur PayPal" }, { status: 500 });
  }
}


