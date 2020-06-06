import { FieldContent } from "../../ConstTypes";

/**
 * Field element -- a container or parent element for everything inside a grid cell
 */
export abstract class DFAbstractField {
  handleClick() {
    console.log("Abstract DFAbstractField : no action implemented");
  }

  /** document object model for this view element */
  protected dom: HTMLDivElement;

  /**
   *
   * @param fieldContent can be html
   */
  constructor(protected fieldContent?: FieldContent | string) {
    this.dom = document.createElement("div");
    if (fieldContent) {
      if (typeof fieldContent === "string") this.dom.innerHTML = fieldContent;
      else this.dom.appendChild(fieldContent);
    }
  }

  getDOM = () => this.dom;
}
