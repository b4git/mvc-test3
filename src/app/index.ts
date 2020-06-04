import { sampleRow, SinglesRowData } from "../model/model";
import { DataFrame } from "../views";
import { DFColumnName } from "../ConstTypes";
import { JointDF } from "../views/JointDF/JointDF";

const app = document.getElementById("app")!;
const status = document.getElementById("status")!;
app.innerHTML = "<h1>It works</h1>";

const toggleBackground = (elm: HTMLElement, color: string) => {
  elm.style.backgroundColor =
    elm.style.backgroundColor === color ? "initial" : color;
};

export const createTable = (
  sampleRows: SinglesRowData[],
  parent: HTMLElement
) => {
  if (sampleRows.length === 0) return;

  const t: HTMLTableElement = document.createElement("table");

  const headerRow = t.insertRow();

  // columns
  const columnNames = Object.keys(sampleRows[0]);
  columnNames.forEach(columnName => {
    const th = document.createElement("th");
    th.innerText = columnName;
    headerRow.appendChild(th);
  });

  sampleRows.forEach((rd, rindx) => {
    const row = t.insertRow();

    columnNames.forEach((columnName, cindx) => {
      const td = row.insertCell();
      td.innerText = rd[columnNames[cindx] as keyof SinglesRowData].toFixed(2);
      row.appendChild(td);
    });
  });

  // handlers : skip the header
  let bidIndx = columnNames.indexOf("bid");
  let askIndx = columnNames.indexOf("ask");
  for (let i = 0; i < t.rows.length; i++) {
    t.rows[i].cells[bidIndx].addEventListener("click", () => {
      toggleBackground(t.rows[i].cells[bidIndx], "red");

      const legs = document.createElement("div");
      legs.innerText = t.rows[i].cells[bidIndx].innerText;
      status.appendChild(legs);
    });
    t.rows[i].cells[askIndx].addEventListener("click", () => {
      toggleBackground(t.rows[i].cells[askIndx], "green");
    });
  }

  return parent.appendChild(t);
};

export const generateDF = () => {
  // createTable([sampleRow, sampleRow], app);
  const df = new DataFrame(Object.keys(sampleRow) as DFColumnName[], [
    Object.values(sampleRow) as (string | number)[]
    //Object.values(sampleRow) as (string | number)[]
  ]).getDOM();
  document.body.appendChild(df);
};

const generateJointDF = () => {
  // createTable([sampleRow, sampleRow], app);

  const df = new JointDF(["Bid", "Ask"], [], ["Bid", "Ask"], [], "Strike");
  document.body.appendChild(df.getDOM());
};

window.onmousedown = () => {
  generateJointDF();
};
