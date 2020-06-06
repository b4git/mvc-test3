export type OptionsAttribute =
  | "Strike"
  | "Bid"
  | "Ask"
  | "Last"
  | "Vlm"
  | "Vlt"
  | "Delta"
  | "Theta";

export type CellType = "th" | "td";

export type PriceData = { [key in OptionsAttribute]: number };

export type FieldContent = HTMLElement; /// string | number;

export type DFIndex = {
  row: number;
  column: number;
};
