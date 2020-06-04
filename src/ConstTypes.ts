export type DFColumnName =
  | "Strike"
  | "Bid"
  | "Ask"
  | "Last"
  | "Vlm"
  | "Vlt"
  | "Delta"
  | "Theta";

export type CellType = "th" | "td";

export type PriceData = { [key in DFColumnName]: number };
