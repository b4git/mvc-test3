import { DFAbstractCell } from "./DFAbstractCell";

export class DFCell extends DFAbstractCell {
  /**
   *
   * @param cellData can be html
   */
  constructor(cellData: string | number) {
    super(cellData, "td");
  }
}
