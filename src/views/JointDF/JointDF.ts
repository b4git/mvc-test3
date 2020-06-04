import { DataFrame } from "../";
import { PriceData, DFColumnName } from "../../ConstTypes";

enum DFSide {
  LEFT,
  RIGHT
}
type StrikePrice = string;

export class JointDF extends DataFrame {
  // properties
  protected leftCols: DFColumnName[];
  protected rightCols: DFColumnName[];
  protected allCols: DFColumnName[];

  protected joinBycol: DFColumnName;
  protected rowMapping: Map<StrikePrice, number>; // Maps remember insertion order!
  protected colMapping: Map<DFSide, Map<DFColumnName, number>>;

  /**
   *
   * @param leftCols only the left side cols -- not including the center
   * @param leftData
   * @param rightCols
   * @param rightData
   * @param joinBy the center column
   */
  constructor(
    leftCols: DFColumnName[],
    leftData: PriceData[],
    rightCols: DFColumnName[],
    rightData: PriceData[],
    joinBy: DFColumnName
  ) {
    const allColumns = leftCols.concat([joinBy]).concat(rightCols);
    //const tempArr = new Array(5).fill(0);
    //const allCellsData = new Array(3).fill(tempArr);

    super(allColumns, []);

    this.leftCols = leftCols;
    this.rightCols = rightCols;
    this.joinBycol = joinBy;
    this.allCols = allColumns;

    this.initMapping();
    this.insertRows(leftData, rightData);
  }

  private initMapping() {
    this.rowMapping = new Map();
    const leftMap = new Map<DFColumnName, number>();
    const rightMap = new Map<DFColumnName, number>();
    this.colMapping = new Map();
    this.colMapping.set(DFSide.LEFT, leftMap);
    this.colMapping.set(DFSide.RIGHT, rightMap);
  }

  insertRows(leftData: PriceData[], rightData: PriceData[]) {
    for(let i = 0; i < leftData.length; i ++){
      
    }
  }

  tableIndices(
    side: DFSide,
    strikePrice: StrikePrice,
    columnName: DFColumnName
  ) {
    let row = this.rowMapping.get(strikePrice);
    const sideMap = this.colMapping.get(side);
    let col: number | undefined;
    if (sideMap !== undefined) {
      col = sideMap.get(columnName);
    }

    // alternative:
    //row =

    return { row, col };
  }

  // end of the class
}
