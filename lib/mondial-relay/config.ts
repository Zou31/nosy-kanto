import "server-only";

export function getMondialRelayConfig() {
  const env = process.env.MONDIAL_RELAY_ENV;
  const enabled = process.env.MONDIAL_RELAY_API_ENABLED;

  if (env !== "sandbox" || enabled !== "false") {
    throw new Error(
      "Mondial Relay : configuration sandbox sécurisée requise."
    );
  }

  const url = process.env.MONDIAL_RELAY_API_URL;
  const login = process.env.MONDIAL_RELAY_API_LOGIN;
  const password = process.env.MONDIAL_RELAY_API_PASSWORD;
  const customerId = process.env.MONDIAL_RELAY_CUSTOMER_ID;

  if (!url || !login || !password || !customerId) {
    throw new Error(
      "Mondial Relay : paramètres de connexion manquants."
    );
  }

  if (
    url !==
    "https://connect-api-sandbox.mondialrelay.com/api/shipment"
  ) {
    throw new Error(
      "Mondial Relay : URL sandbox incorrecte."
    );
  }
  return {
  url,
  login,
  password,
  customerId,
  enabled: false as const,
  environment: "sandbox" as const,
};

}
