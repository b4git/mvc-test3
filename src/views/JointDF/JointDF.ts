import { TableDataFrame } from "../";
import { DFField } from "../DataFrame/DFCell";
import { OptionsAttribute, PriceData } from "../../ConstTypes";

import { Log } from "../../logger/Log";

export class JointDF<T> extends TableDataFrame {
  // properties
  protected leftColumnKeys: (T)[];
  protected rightColumnKeys: (T)[]; //OptionsAttributes[];
  protected allColumns: (T)[]; //OptionsAttributes[];

  protected joinBycol: T; //OptionsAttributes;
  // protected rowMapping: Map<StrikePrice, number>; // Maps remember insertion order!
  // protected colMapping: Map<DFSide, Map<DFColumnName, number>>;

  /**
   *
   * @param leftColumnKeys only the left side cols -- not including the center
   * @param leftSideData
   * @param rightColumnKeys
   * @param rightSideData
   * @param middleColumnKey the center column to which to join by left and right side
   */
  constructor(
    leftColumnKeys: (T)[],
    rightColumnKeys: (T)[],
    middleColumnKey: T
    // leftSideData: T[],
    // rightSideData: T[]
  ) {
    const allColumns = leftColumnKeys
      .concat([middleColumnKey])
      .concat(rightColumnKeys);
    //const tempArr = new Array(5).fill(0);
    //const allCellsData = new Array(3).fill(tempArr);

    super();

    this.leftColumnKeys = leftColumnKeys;
    this.rightColumnKeys = rightColumnKeys;
    this.joinBycol = middleColumnKey;
    this.allColumns = allColumns;

    // this.initMapping();
    // this.insertRows(leftSideData, rightSideData);
  }

  protected leftColIndex(columnHeader: T) {
    return this.leftColumnKeys.indexOf(columnHeader);
  }

  protected middleColIndex(columnHeader: T) {
    return this.leftColumnKeys.length;
  }

  protected rightColIndex(columnHeader: T) {
    return (
      this.leftColumnKeys.length +
      1 +
      this.rightColumnKeys.indexOf(columnHeader)
    );
  }

  public setLeftField(columnHeader: T, rowIndex: number, field: DFField) {
    this.setField(rowIndex, this.leftColumnKeys.indexOf(columnHeader), field);
  }

  public setMiddleField(columnHeader: T, rowIndex: number, field: DFField) {
    this.setField(rowIndex, this.leftColumnKeys.length, field);
  }

  public setRightField(columnHeader: T, rowIndex: number, field: DFField) {
    this.setField(
      rowIndex,
      this.leftColumnKeys.length +
        1 +
        this.rightColumnKeys.indexOf(columnHeader),
      field
    );
  }
}

// private initMapping() {
//   this.rowMapping = new Map();
//   const leftMap = new Map<DFColumnName, number>();
//   const rightMap = new Map<DFColumnName, number>();
//   this.colMapping = new Map();
//   this.colMapping.set(DFSide.LEFT, leftMap);
//   this.colMapping.set(DFSide.RIGHT, rightMap);
// }

// insertRows(leftData: PriceData[], rightData: PriceData[]) {
//   for (let i = 0; i < leftData.length; i++) {}
// }

// tableIndices(
//   side: DFSide,
//   strikePrice: StrikePrice,
//   columnName: DFColumnName
// ) {
//   let row = this.rowMapping.get(strikePrice);
//   const sideMap = this.colMapping.get(side);
//   let col: number | undefined;
//   if (sideMap !== undefined) {
//     col = sideMap.get(columnName);
//   }

//   // alternative:
//   //row =

//   return { row, col };
// }

// end of the class
//

export class OptionsChainDF extends JointDF<OptionsAttribute> {
  protected strikePrices: string[];

  /** columns except the center "Strike" */
  constructor(
    columns: OptionsAttribute[],
    callsData: PriceData[],
    putsData: PriceData[]
  ) {
    // ["Bid", "Ask", "Last"], ["Bid", "Ask", "Last"], "Strike");
    super(columns, columns, "Strike");
    // create header and body rows
    this.createHeaderRow();
    this.createBodyRows(callsData, putsData);

    this.strikePrices = callsData.map(e => e.Strike + "");

    // ktd: remove for testing only!
    Log("strikes = ", this.strikePrices);
    Log("leftColKeys = ", this.leftColumnKeys);
    for (let r = 1; r <= this.strikePrices.length; r++) {
      for (let c = 0; c < this.leftColumnKeys.length; c++) {
        Log("Left: row, col: ", r, c);
        let x = {
          Ask: Math.random() * 100,
          Bid: Math.random() * 100,
          Last: Math.random() * 100,
          Strike: this.strikePrices[r - 1] as any
        } as PriceData;
        this.getField(r, c)
          .getDOM()
          .addEventListener("click", () => this.updateCallPrice(x));
      }

      for (
        let j = 0, c = this.leftColumnKeys.length + 1;
        j < this.rightColumnKeys.length;
        j++, c++
      ) {
        Log("Right: row, col: ", r, c);

        let x = {
          Ask: Math.random() * 100,
          Bid: Math.random() * 100,
          Last: Math.random() * 100,
          Strike: this.strikePrices[r - 1] as any
        } as PriceData;
        this.getField(r, c)
          .getDOM()
          .addEventListener("click", () => this.updatePutPrice(x));
      }
    }
  }

  public updateCallPrice(callData: PriceData) {
    let r = this.strikePrices.indexOf(callData.Strike + "") + 1; // +1 because of extra header row
    let c = 0;
    for (let columnName of this.leftColumnKeys) {
      // columnNames are in order so no need to maintain the order explicitly if using it always?
      this.getField(r, c).getDOM().innerText = callData[columnName].toFixed(2);
      ++c;
      //const c = this.leftColIndex(columnName);
    }
  }

  public updatePutPrice(putData: PriceData) {
    let r = this.strikePrices.indexOf(putData.Strike + "") + 1;
    let c = this.leftColumnKeys.length + 1;
    for (let columnName of this.rightColumnKeys) {
      // columnNames are in order so no need to maintain the order explicitly if using it always?
      this.getField(r, c).getDOM().innerText = putData[columnName].toFixed(2);
      ++c;
      //const c = this.leftColIndex(columnName);
    }
  }

  public updateCallsOrPuts() {}

  protected createHeaderRow() {
    let fields: DFField[] = [];
    // left side
    for (let header of this.leftColumnKeys) {
      fields.push(new DFField(header as string));
    }

    // middle
    fields.push(new DFField(this.joinBycol as string));

    // right side
    for (let header of this.rightColumnKeys) {
      fields.push(new DFField(header));
    }

    // insert the first row !
    this.insertRow(fields);
  }

  protected createBodyRows(
    leftSideData: PriceData[],
    rightSideData: PriceData[]
  ) {
    for (let r = 0; r < leftSideData.length; r++) {
      let fields: DFField[] = [];

      // left side fields
      for (let header of this.leftColumnKeys) {
        // let priceData = leftSideData[r];
        // let attrValue = priceData[header] + ""; // convert number to str
        fields.push(new DFField(leftSideData[r][header].toFixed(2.0)));
      }

      // middle fields
      fields.push(new DFField(leftSideData[r][this.joinBycol].toFixed(2.0)));

      // right side fields
      for (let header of this.rightColumnKeys) {
        fields.push(new DFField(rightSideData[r][header].toFixed(2.0)));
      }

      // insert the WHOLE ROW!
      this.insertRow(fields);
    }
  }
}
