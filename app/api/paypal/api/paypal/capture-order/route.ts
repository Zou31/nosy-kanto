import { NextResponse } from "next/server";


async function getPayPalAccessToken() {
 const baseUrl = process.env.PAYPAL_BASE_URL;
 const clientId = process.env.PAYPAL_CLIENT_ID;
 const secret = process.env.PAYPAL_CLIENT_SECRET;


 if (!baseUrl || !clientId || !secret) {
   throw new Error("PayPal env manquantes (PAYPAL_BASE_URL / PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)");
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
   const { orderID } = (await req.json()) as { orderID: string };
   if (!orderID) {
     return NextResponse.json({ error: "orderID manquant" }, { status: 400 });
   }


   const token = await getPayPalAccessToken();
   const baseUrl = process.env.PAYPAL_BASE_URL!;


   const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
     method: "POST",
     headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
     },
   });


   const data = await res.json().catch(() => ({} as any));
   if (!res.ok) {
     return NextResponse.json(
       { error: data?.message || "Erreur PayPal (capture)", details: data },
       { status: 500 }
     );
   }


   return NextResponse.json({ ok: true, data });
 } catch (e: any) {
   return NextResponse.json(
     { error: e?.message || "Erreur serveur PayPal" },
     { status: 500 }
   );
 }
}





