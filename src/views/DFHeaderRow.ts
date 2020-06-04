import { DFCell } from "./DFCell";
import { DFColumnName } from "../ConstTypes";
import { DFHeaderCell } from "./DFHeaderCell";

export class DFHeaderRow {
  protected dom: HTMLTableRowElement;
  protected dfCells: DFCell[] = [];

  constructor(private headerNames: DFColumnName[]) {
    this.dom = document.createElement("tr");

    for (let i = 0; i < headerNames.length; i++) {
      this.appendHeader(headerNames[i]);
    }
  }

  //addCell = (cell: DFCell) => {};

  //addColumns = (columnNames: string[]) => {};
  getDOM = () => this.dom;

  private appendHeader(headerName: DFColumnName) {
    const dfCell = new DFHeaderCell(headerName);
    this.dfCells.push(dfCell);
    this.dom.appendChild(dfCell.getDOM());
  }

  removeHeaders(columnNames: string[]) {}
}
