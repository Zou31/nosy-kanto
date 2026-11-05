import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const requiredVariables = [
  "MONDIAL_RELAY_ENV",
  "MONDIAL_RELAY_API_ENABLED",
  "MONDIAL_RELAY_API_URL",
  "MONDIAL_RELAY_API_LOGIN",
  "MONDIAL_RELAY_API_PASSWORD",
];

console.log("=== MONDIAL RELAY : TEST CONFIGURATION ===");

let valid = true;

for (const name of requiredVariables) {
  const value = process.env[name];

  if (!value || !value.trim()) {
    console.log(`${name} : MANQUANT`);
    valid = false;
  } else {
    console.log(`${name} : OK`);
  }
}

if (
  process.env.MONDIAL_RELAY_ENV !== "sandbox" ||
  process.env.MONDIAL_RELAY_API_ENABLED !== "false"
) {
  console.log("ERREUR : configuration de sécurité incorrecte.");
  valid = false;
}

console.log(
  valid
    ? "CONFIGURATION SANDBOX OK"
    : "CONFIGURATION À CORRIGER"
);

if (!valid) process.exitCode = 1;
