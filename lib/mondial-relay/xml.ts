export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
export type MondialRelayXmlContext = {
  login: string;
  password: string;
  customerId: string;
};
export function buildMondialRelayContextXml(
  context: MondialRelayXmlContext
): string {
  return `<Context>
  <Login>${escapeXml(context.login)}</Login>
  <Password>${escapeXml(context.password)}</Password>
  <CustomerId>${escapeXml(context.customerId)}</CustomerId>
  <Culture>fr-FR</Culture>
  <VersionAPI>1.0</VersionAPI>
</Context>`;
}
export function buildMondialRelayOutputOptionsXml(): string {
  return `<OutputOptions>
  <OutputFormat>10x15</OutputFormat>
  <OutputType>PdfUrl</OutputType>
</OutputOptions>`;
}
export type MondialRelayDeliveryMode = "24R" | "24L";

export function buildMondialRelayDeliveryModeXml(
  mode: MondialRelayDeliveryMode,
  location: string
): string {
  if (!/^[A-Z]{2}-[A-Za-z0-9]+$/.test(location)) {
    throw new Error("Mondial Relay : identifiant de relais invalide.");
  }

  return `<DeliveryMode Mode="${mode}" Location="${escapeXml(location)}" />`;
}
export function buildMondialRelayCollectionModeXml(): string {
  return `<CollectionMode Mode="CCC" Location="" />`;
}
export type MondialRelayParcel = {
  content: string;
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  depthCm: number;
};
export function validateParcelNumber(
  value: number,
  field: string
): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(
      `Mondial Relay : ${field} doit être un entier positif.`
    );
  }

  return value;
}
export function buildMondialRelayParcelXml(
  parcel: MondialRelayParcel
): string {
  const weight = validateParcelNumber(parcel.weightGrams, "poids");
  const length = validateParcelNumber(parcel.lengthCm, "longueur");
  const width = validateParcelNumber(parcel.widthCm, "largeur");
  const depth = validateParcelNumber(parcel.depthCm, "profondeur");

  if (!parcel.content.trim()) {
    throw new Error("Mondial Relay : contenu du colis manquant.");
  }

  return `<Parcel>
  <Content>${escapeXml(parcel.content)}</Content>
  <Weight Value="${weight}" Unit="gr" />
  <Length Value="${length}" Unit="cm" />
  <Width Value="${width}" Unit="cm" />
  <Depth Value="${depth}" Unit="cm" />
</Parcel>`;
}
export type MondialRelayAddress = {
  title: string;
  firstName: string;
  lastName: string;
  streetName: string;
  houseNo: string;
  countryCode: string;
  postCode: string;
  city: string;
  addressAdd1?: string;
  addressAdd2?: string;
  addressAdd3?: string;
  phoneNo?: string;
  mobileNo?: string;
  email: string;
};
export function buildMondialRelayAddressXml(
  address: MondialRelayAddress
): string {
  const field = (tag: string, value: string = "") =>
  `<${tag}>${escapeXml(value)}</${tag}>`;

  return `<Address>
  ${field("Title", address.title)}
  ${field("Firstname", address.firstName)}
  ${field("Lastname", address.lastName)}
  ${field("Streetname", address.streetName)}
  ${field("HouseNo", address.houseNo)}
  ${field("CountryCode", address.countryCode)}
  ${field("PostCode", address.postCode)}
  ${field("City", address.city)}
  ${field("AddressAdd1", address.addressAdd1)}
  ${field("AddressAdd2", address.addressAdd2)}
  ${field("AddressAdd3", address.addressAdd3)}
  ${field("PhoneNo", address.phoneNo)}
  ${field("MobileNo", address.mobileNo)}
  ${field("Email", address.email)}
</Address>`;
}
export function buildMondialRelaySenderXml(
  address: MondialRelayAddress
): string {
  return `<Sender>
  ${buildMondialRelayAddressXml(address)}
</Sender>`;
}
export function buildMondialRelayRecipientXml(
  address: MondialRelayAddress
): string {
  return `<Recipient>
  ${buildMondialRelayAddressXml(address)}
</Recipient>`;
}
export type MondialRelayShipment = {
  orderNo: string;
  customerNo: string;
  deliveryMode: MondialRelayDeliveryMode;
  relayLocation: string;
  parcels: MondialRelayParcel[];
  sender: MondialRelayAddress;
  recipient: MondialRelayAddress;
  deliveryInstruction?: string;
};
export function buildMondialRelayShipmentXml(
  shipment: MondialRelayShipment
): string {
  if (!shipment.orderNo.trim()) {
    throw new Error("Mondial Relay : numéro de commande manquant.");
  }

  if (shipment.parcels.length === 0) {
    throw new Error("Mondial Relay : aucun colis renseigné.");
  }

  const parcelsXml = shipment.parcels
    .map(buildMondialRelayParcelXml)
    .join("\n");

  return `<Shipment>
  <OrderNo>${escapeXml(shipment.orderNo)}</OrderNo>
  <CustomerNo>${escapeXml(shipment.customerNo)}</CustomerNo>
  <ParcelCount>${shipment.parcels.length}</ParcelCount>
  ${buildMondialRelayDeliveryModeXml(
    shipment.deliveryMode,
    shipment.relayLocation
  )}
  ${buildMondialRelayCollectionModeXml()}
  <Parcels>${parcelsXml}</Parcels>
  ${buildMondialRelaySenderXml(shipment.sender)}
  ${buildMondialRelayRecipientXml(shipment.recipient)}
  <DeliveryInstruction>${escapeXml(
    shipment.deliveryInstruction ?? ""
  )}</DeliveryInstruction>
</Shipment>`;
}
export function buildMondialRelayRequestXml(
  context: MondialRelayXmlContext,
  shipment: MondialRelayShipment
): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<ShipmentCreationRequest
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns="http://www.example.org/Request">
  ${buildMondialRelayContextXml(context)}
  ${buildMondialRelayOutputOptionsXml()}
  <ShipmentsList>
    ${buildMondialRelayShipmentXml(shipment)}
  </ShipmentsList>
</ShipmentCreationRequest>`;
}



