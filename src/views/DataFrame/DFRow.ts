import { DFCell } from "./DFCell";
import { DFColumnName } from "../../ConstTypes";
import { DFStrikeCell } from "./DFStrikeCell";
import { DFTradeCell } from "./DFTradeCell";

export class DFRow {
  protected dom: HTMLTableRowElement;
  protected dfCells: DFCell[] = [];

  constructor(
    private columnNames: DFColumnName[],
    cellData: (string | number)[]
  ) {
    this.dom = document.createElement("tr");

    for (let i = 0; i < columnNames.length; i++) {
      this.appendCell(columnNames[i], cellData[i]);
    }
  }

  //addCell = (cell: DFCell) => {};

  //addColumns = (columnNames: string[]) => {};

  getDOM = () => this.dom;

  appendCell(columnName: DFColumnName, cellDatum: string | number) {
    const dfCell = DFCellFactory.createCell(columnName, cellDatum);
    this.dfCells.push(dfCell);
    this.dom.appendChild(dfCell.getDOM());
  }

  removeColumns(columnNames: string[]) {}
}

export class DFCellFactory {
  public static createCell(
    columnName: DFColumnName,
    cellDatum: string | number
  ) {
    switch (columnName) {
      case "Ask":
      case "Bid":
        return new DFTradeCell(cellDatum);
      case "Strike":
        return new DFStrikeCell(cellDatum);
      default:
        return new DFCell(cellDatum);
    }
  }
}
