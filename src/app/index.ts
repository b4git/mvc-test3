import { sampleRow, SinglesRowData } from "../model/model";
import { OptionsChainDF } from "../views/JointDF/JointDF";

const app = document.getElementById("app")!;
const status = document.getElementById("status")!;
app.innerHTML = "<h1>It works</h1>";

const toggleBackground = (elm: HTMLElement, color: string) => {
  elm.style.backgroundColor =
    elm.style.backgroundColor === color ? "initial" : color;
  console.log("Color Changed");
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

// export const generateDF = () => {
//   // createTable([sampleRow, sampleRow], app);
//   const df = new TableDataFrame(Object.keys(sampleRow) as OptionsAttributes[], [
//     Object.values(sampleRow) as (string | number)[]
//     //Object.values(sampleRow) as (string | number)[]
//   ]).getDOM();
//   document.body.appendChild(df);
// };

// const generateJointDF = () => {
//   // createTable([sampleRow, sampleRow], app);

//   const df = new JointDF(["Bid", "Ask"], [], ["Bid", "Ask"], [], "Strike");
//   document.body.appendChild(df.getDOM());
// };

// const testIndices = () => {
//   let t = createTable([sampleRow, sampleRow], app)!;
//   const cells = t.querySelectorAll("td");
//   cells.forEach(cell => {
//     cell.addEventListener(
//       "click",
//       ev =>
//         console.log(
//           "Row index: " +
//             cell.closest("tr")!.rowIndex +
//             " | Column index: " +
//             cell.cellIndex +
//             " event phase (1,2,3) = " +
//             ev.eventPhase
//         ),
//       { capture: true }
//     ); /** true captures during the capturing phase */
//   });
// };

const testIndices2 = () => {
  let t = createTable([sampleRow, sampleRow], app)!;
  const rows = t.querySelectorAll("tr");
  rows.forEach(row => {
    row.addEventListener(
      "click",
      ev =>
        console.log(
          "Row index: " +
            row.rowIndex +
            " | Column index: " +
            (ev.target as HTMLElement).closest("td")!.cellIndex +
            " event phase (1,2,3) = " +
            ev.eventPhase
        ),
      { capture: true }
    ); /** true captures during the capturing phase */
  });
};

const testOptionsChainDF = () => {
  const callData = [
    { Bid: 3.5, Ask: 3.6, Last: 3.55, Strike: 10 },
    { Bid: 2.6, Ask: 2.7, Last: 2.65, Strike: 11 },
    { Bid: 1.8, Ask: 1.9, Last: 1.86, Strike: 12 },
    { Bid: 1.2, Ask: 1.3, Last: 1.24, Strike: 13 },
    { Bid: 0.7, Ask: 0.8, Last: 0.77, Strike: 14 },
    { Bid: 0.2, Ask: 0.25, Last: 0.23, Strike: 15 }
  ];

  const putData = [
    { Bid: 3.5, Ask: 3.6, Last: 3.55, Strike: 15 },
    { Bid: 2.6, Ask: 2.7, Last: 2.65, Strike: 14 },
    { Bid: 1.8, Ask: 1.9, Last: 1.86, Strike: 13 },
    { Bid: 1.2, Ask: 1.3, Last: 1.24, Strike: 12 },
    { Bid: 0.7, Ask: 0.8, Last: 0.77, Strike: 11 },
    { Bid: 0.2, Ask: 0.25, Last: 0.23, Strike: 10 }
  ];

  let ocdf = new OptionsChainDF(
    ["Bid", "Ask", "Last"],
    callData as any,
    putData as any
  );
  document.body.appendChild(ocdf.getDOM());
};

let loaded = false;
window.onmousedown = () => {
  if (loaded === false) {
    testOptionsChainDF();
    loaded = true;
  }
  //alert("window loaded");
  //console.log("Good");
};
