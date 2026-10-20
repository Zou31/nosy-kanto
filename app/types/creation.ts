import type { CollectionName } from "../constants/collections";

export type CreationStatus =
  | "idea"
  | "sketch"
  | "prototype"
  | "validated"
  | "product";

export type CreationProject = {
  id: string;
  name: string;
  description: string;
  status: CreationStatus;
  createdAt: string;
  updatedAt: string;
  collection: CollectionName;
};
