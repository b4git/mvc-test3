import { DFColumnName } from "../../ConstTypes";
import { DFRow } from "./DFRow";
import { DFHeaderRow } from "./DFHeaderRow";

export class DataFrame {
  protected dom: HTMLTableElement;
  protected headerRow: DFHeaderRow;
  protected bodyRows: DFRow[] = [];

  constructor(headerNames: DFColumnName[], cellsData: (string | number)[][]) {
    this.dom = document.createElement("table");
    this.headerRow = new DFHeaderRow(headerNames);
    this.dom.appendChild(this.headerRow.getDOM());

    this.appendBodyrows(headerNames, cellsData);
  }

  appendBodyrows(
    headerNames: DFColumnName[],
    cellsData: (string | number)[][]
  ) {
    for (let dataRow = 0; dataRow < cellsData.length; dataRow++) {
      this.appendBodyRow(headerNames, cellsData[dataRow]);
    }
  }

  appendBodyRow(headerNames: DFColumnName[], cellsData: (string | number)[]) {
    const bodyRow = new DFRow(headerNames, cellsData);
    this.bodyRows.push(bodyRow);
    this.dom.appendChild(bodyRow.getDOM());
  }

  getDOM = () => this.dom;
}
