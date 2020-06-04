import { DFAbstractCell } from "./DFAbstractCell";

export class DFHeaderCell extends DFAbstractCell {
  /**
   *
   * @param cellData can be html
   */
  constructor(cellData: string | number) {
    super(cellData, "th");
  }
}
