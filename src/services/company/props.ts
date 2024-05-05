import { SpecialtyTypes } from "..";

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  types: SpecialtyTypes[];
  cnpj: string;
  createdAt: Date;
  updatedAt?: Date;
}
