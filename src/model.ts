export interface SinglesRowData {
  bid: number;
  ask: number;
  strike: number;
  vlm: number;
  vlt: number;
}

export const sampleRow: SinglesRowData = {
  bid: 1,
  ask: 2,
  vlm: 200,
  vlt: 10.15,
  strike: 300
};
