import { sampleRow, SinglesRowData } from "./model";

let app = document.getElementById("app")!;
app.innerHTML = "<h1>It works</h1>";

const createTable = (sampleRows: SinglesRowData[], parent: HTMLElement) => {
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

  return parent.appendChild(t);
};

window.onmousedown = () => {
  createTable([sampleRow, sampleRow], app);
};
