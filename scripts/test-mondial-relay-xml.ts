import {
  buildMondialRelayRequestXml,
  type MondialRelayXmlContext,
  type MondialRelayShipment,
} from "../lib/mondial-relay/xml";

const context: MondialRelayXmlContext = {
  login: "TEST_LOGIN",
  password: "TEST_PASSWORD",
  customerId: "TEST_CUSTOMER",
};

const shipment: MondialRelayShipment = {
  orderNo: "NK-TEST-001",
  customerNo: "CLIENT-TEST",
  deliveryMode: "24R",
  relayLocation: "FR-66974",
  parcels: [
    {
      content: "Sac en raphia & accessoires",
      weightGrams: 1000,
      lengthCm: 40,
      widthCm: 30,
      depthCm: 15,
    },
  ],
  sender: {
    title: "",
    firstName: "Nosy",
    lastName: "Kanto",
    streetName: "Rue Exemple",
    houseNo: "1",
    countryCode: "FR",
    postCode: "31000",
    city: "Toulouse",
    email: "expediteur@example.com",
  },
  recipient: {
    title: "Mme",
    firstName: "Marie",
    lastName: "Test",
    streetName: "Rue de l'Essai",
    houseNo: "10",
    countryCode: "FR",
    postCode: "75001",
    city: "Paris",
    email: "cliente@example.com",
  },
};

const xml = buildMondialRelayRequestXml(context, shipment);

console.log(xml);
