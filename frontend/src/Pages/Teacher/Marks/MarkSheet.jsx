import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spreadsheet from "react-spreadsheet";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { SemesterStudent } from "../../../Services/subjectServices";

export default function MarkSheet() {
  const { id } = useParams();
  const columnLabels = ["Student", "Mid-1", "Mid-2"];
  const [studentList, setStudentList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SemesterStudent(id);
        setStudentList(response);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // Populate initial data with student names and buttons
    if (studentList.length > 0) {
      const initialData = studentList.map((student) => [
        { value: student.name },
        { value: "", button: <button>Button</button> },
        { value: "", button: <button>Button</button> },
      ]);
      setData(initialData);
    }
  }, [studentList]);

  const handleButtonClick = (rowIndex, columnIndex) => {
    console.log(`Button clicked at row ${rowIndex}, column ${columnIndex}`);
    // Implement button click handling logic here
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="w-5/6">
          <div className="pt-10">
            <div className="mb-12">
              <h1 className="mb-5 text-center text-3xl font-bold">
                📚 Enter Marks
              </h1>
            </div>
            <div className="flex w-full items-center justify-center">
              <Spreadsheet
                className="text-xl"
                data={data}
                columnLabels={columnLabels}
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
        </div>
      </div>
    </>
  );
}
