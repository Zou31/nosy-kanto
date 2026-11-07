import "server-only";

import { getMondialRelayConfig } from "./config";
import { sendMondialRelayRequest } from "./http";
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
export async function createMondialRelayShipment(
  shipment: MondialRelayShipment
): Promise<string> {
  const xml = prepareMondialRelayShipment(shipment);
  return sendMondialRelayRequest(xml);
}
