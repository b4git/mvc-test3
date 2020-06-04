import { DFColumnName } from "../ConstTypes";
import { DFRow } from "./DFRow";
import { DFHeaderRow } from "./DFHeaderRow";

export type PriceData = { [key in DFColumnName]: number };

export class DataFrame {
  protected dom: HTMLTableElement;
  protected headerRow: DFHeaderRow;
  protected bodyRows: DFRow[] = [];

  constructor(headerNames: DFColumnName[], cellsData: (string | number)[][]) {
    this.dom = document.createElement("table");
    this.headerRow = new DFHeaderRow(headerNames);

    for (let dataRow = 0; dataRow < cellsData.length; dataRow++) {
      this.appendBodyRow(headerNames, cellsData[dataRow]);
    }
  }

  appendBodyRow(headerNames: DFColumnName[], cellsData: (string | number)[]) {
    for (let i = 0; i < headerNames.length; i++) {
      const bodyRow = new DFRow(headerNames, cellsData);
      this.bodyRows.push(bodyRow);
      this.dom.appendChild(bodyRow.getDOM());
    }
  }

  getDOM = () => this.dom;
}
