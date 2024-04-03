export interface IDateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface IAmountRange {
  minAmount: number | null;
  maxAmount: number | null;
}

export type SortType = "byDefault" | "byAsc" | "byDesc";
