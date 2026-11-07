import "server-only";

import { getMondialRelayConfig } from "./config";
import {
  buildMondialRelayRequestXml,
  type MondialRelayShipment,
} from "./xml";
export function getMondialRelayClientStatus() {
  const config = getMondialRelayConfig();

  return {
    environment: config.environment,
    enabled: config.enabled,
    ready: Boolean(
      config.url &&
      config.login &&
      config.password &&
      config.customerId
    ),
  };
}

export function prepareMondialRelayShipment(
  shipment: MondialRelayShipment
): string {
  const config = getMondialRelayConfig();

  return buildMondialRelayRequestXml(
    {
      login: config.login,
      password: config.password,
      customerId: config.customerId,
    },
    shipment
  );
}
