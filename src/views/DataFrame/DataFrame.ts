import { DFField } from "./DFCell";
import { DFIndex } from "../../ConstTypes";
import { Log } from "../../logger/Log";

/**
 * Representation of RAW Data Frame
 */
export abstract class AbstractDataFrame {
  protected abstract numRows: number;
  protected abstract numColumns: number;

  /** appends at the end */
  protected abstract insertRow(fields: DFField[]): void;
  protected abstract insertColumn(fields: DFField[]): void;

  protected abstract selectedIndices(): DFIndex;
  protected abstract selectedField(): DFField;
  protected abstract selectedRowContent(): DFField[];
  protected abstract selectedColumnContent(): DFField[];

  protected abstract setField(
    rowIndex: number,
    columnIndex: number,
    field: DFField
  ): void;
  protected abstract getField(rowIndex: number, columnIndex: number): DFField;

  protected abstract setRow(rowIndex: number, fields: DFField[]): void;
  protected abstract getRow(rowIndex: number): DFField[];

  protected abstract setColumn(columnIndex: number, fields: DFField[]): void;
  protected abstract getColumn(columnIndex: number): DFField[];

  // HTML DOM of this element
  protected abstract dom: HTMLElement;
  protected abstract getDOM(): HTMLElement;
}

//export class DFTableStrategy implements DFStrategy {}

/**
 * RAW Data Frame implementation using Tables other possibilities could be flexbox or grid layout
 */
export class TableDataFrame extends AbstractDataFrame {
  protected allFields: DFField[][] = [];

  protected insertRow(fields: DFField[] = []): void {
    const row = this.dom.insertRow();

    this.allFields.push(fields);

    for (let field of fields) {
      const cell = row.insertCell();
      cell.appendChild(field.getDOM());
    }
  }
  protected insertColumn(fields: DFField[] = []): void {
    throw new Error("Method not implemented.");
  }
  // protected numRows: number;
  // protected numColumns: number;
  protected selectedIndices(): DFIndex {
    throw new Error("Method not implemented.");
  }
  protected selectedField(): DFField {
    throw new Error("Method not implemented.");
  }
  protected selectedRowContent(): DFField[] {
    throw new Error("Method not implemented.");
  }
  protected selectedColumnContent(): DFField[] {
    throw new Error("Method not implemented.");
  }
  protected setField(
    rowIndex: number,
    columnIndex: number,
    field: DFField
  ): void {
    throw new Error("Method not implemented.");
  }
  protected getField(rowIndex: number, columnIndex: number): DFField {
    //Log("in getfield", this.allFields);
    return this.allFields[rowIndex][columnIndex];
  }
  protected setRow(rowIndex: number, fields: DFField[]): void {
    throw new Error("Method not implemented.");
  }
  protected setColumn(columnIndex: number, fields: DFField[]): void {
    throw new Error("Method not implemented.");
  }

  protected getRow(rowIndex: number): DFField[] {
    throw new Error("Method not implemented.");
  }
  protected getColumn(columnIndex: number): DFField[] {
    throw new Error("Method not implemented.");
  }

  protected dom: HTMLTableElement;
  protected selectedRow = -1;
  protected selectedColumn = -1;

  // protected headerRow: DFHeaderRow;
  // protected bodyRows: DFRow[] = [];

  /**
   *
   * @param numRows Initial number of empty rows to insert
   * @param numColumns  ;;
   */
  constructor(protected numRows = 0, protected numColumns = 0) {
    super();
    this.dom = document.createElement("table");
    for (let r = 0; r < numRows; r++) {
      const row = this.dom.insertRow();
      for (let c = 0; c < numColumns; c++) {
        row.insertCell();
      }
    }
  }

  // constructor(headerNames: DFColumnName[], cellsData: (string | number)[][]) {
  //   this.dom = document.createElement("table");
  //   this.headerRow = new DFHeaderRow(headerNames);
  //   this.dom.appendChild(this.headerRow.getDOM());

  //   this.appendBodyrows(headerNames, cellsData);
  // }

  // appendBodyrows(
  //   headerNames: DFColumnName[],
  //   cellsData: (string | number)[][]
  // ) {
  //   for (let dataRow = 0; dataRow < cellsData.length; dataRow++) {
  //     this.appendBodyRow(headerNames, cellsData[dataRow]);
  //   }
  // }

  // appendBodyRow(headerNames: DFColumnName[], cellsData: (string | number)[]) {
  //   const bodyRow = new DFRow(headerNames, cellsData);
  //   this.bodyRows.push(bodyRow);
  //   this.dom.appendChild(bodyRow.getDOM());
  // }

  public getDOM = () => this.dom;
}
