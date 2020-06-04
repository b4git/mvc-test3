import { CellType } from "../ConstTypes";

export abstract class DFAbstractCell {
  handleClick() {
    console.log("Abstract DFCell : no action implemented");
  }

  /** document object model for this view element */
  protected dom: HTMLTableCellElement;

  /**
   *
   * @param cellData can be html
   */
  constructor(protected cellData: string | number, cellType: CellType) {
    this.dom = document.createElement(cellType);
    this.dom.innerHTML = cellData + "";
  }

  getDOM = () => this.dom;
}
