import "server-only";

import { getMondialRelayConfig } from "./config";
export function assertMondialRelayHttpDisabled(): void {
  const config = getMondialRelayConfig();

  if (config.enabled === false) {
    throw new Error(
      "Mondial Relay : envoi HTTP désactivé par sécurité."
    );
  }
}
export async function sendMondialRelayRequest(
  xml: string
): Promise<string> {
  assertMondialRelayHttpDisabled();

  throw new Error(
    "Mondial Relay : envoi HTTP non encore implémenté."
  );
}
