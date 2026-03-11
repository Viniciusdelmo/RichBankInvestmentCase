export type UUID = string;

export interface Asset {
  id: UUID;
  ticker: string;
  companyName?: string;
  sector?: string;
}

