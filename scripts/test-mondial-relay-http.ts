import { sendMondialRelayRequest } from "../lib/mondial-relay/http";

async function main() {
  try {
    await sendMondialRelayRequest("<test />");
    throw new Error("ÉCHEC : envoi non bloqué");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);

    if (!message.includes("envoi HTTP désactivé")) {
      throw error;
    }

    console.log("TEST SÉCURITÉ MONDIAL RELAY OK");
  }
}

main().catch(console.error);
