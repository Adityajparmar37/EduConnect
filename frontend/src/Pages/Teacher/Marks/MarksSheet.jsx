import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";

export default function MarkSheet() {
  const columnLabels = ["Student", "Attendance"];
  const rowLabels = ["1", "2"];
  const initialData = [
    [
      { value: "Vanilla", button: <button>Button</button> },
      { value: "Chocolate", button: <button>Button</button> },
    ],
    [
      { value: "Strawberry", button: <button>Button</button> },
      { value: "Cookies", button: <button>Button</button> },
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
