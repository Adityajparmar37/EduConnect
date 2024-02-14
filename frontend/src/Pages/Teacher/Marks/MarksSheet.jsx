import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";

export default function MarkSheet() {
  const columnLabels = ["Student", "Mid-1","Mid-2"];
  const rowLabels = ["1", "2","3","4","5","6"];
  const initialData = [
    [
      { value: "Aditya", button: <button>Button</button> },
      { value: "25", button: <button>Button</button> },
      { value: "25", button: <button>Button</button> },
    ],
    [
      { value: "Parth", button: <button>Button</button> },
      { value: "30", button: <button>Button</button> },
      { value: "15", button: <button>Button</button> },
    ],
    [
      { value: "Het", button: <button>Button</button> },
      { value: "20", button: <button>Button</button> },
      { value: "22", button: <button>Button</button> },
    ],
    [
      { value: "Aryan", button: <button>Button</button> },
      { value: "30", button: <button>Button</button> },
      { value: "30", button: <button>Button</button> },
    ],
    [
      { value: "Brijesh", button: <button>Button</button> },
      { value: "30", button: <button>Button</button> },
      { value: "30", button: <button>Button</button> },
    ],
    [
      { value: "Vaidik", button: <button>Button</button> },
      { value: "29", button: <button>Button</button> },
      { value: "28", button: <button>Button</button> },
    ],
  ];
  const [data, setData] = useState(initialData);

  const handleButtonClick = (rowIndex, columnIndex) => {
    const updatedData = [...data];
    // Do something when a button is clicked, for example:
    console.log(`Button clicked at row ${rowIndex}, column ${columnIndex}`);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="w-5/6">
          <Spreadsheet
            data={data}
            columnLabels={columnLabels}
            rowLabels={rowLabels}
            onChange={setData}
            renderComponent={(props) => {
              const { cell, rowIndex, columnIndex } = props;
              if (cell.button) {
                return (
                  <div>
                    {cell.value} {cell.button}
                  </div>
                );
              }
              return cell.value;
            }}
            onCellClick={(rowIndex, columnIndex) => {
              const cell = data[rowIndex][columnIndex];
              if (cell.button) {
                handleButtonClick(rowIndex, columnIndex);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
