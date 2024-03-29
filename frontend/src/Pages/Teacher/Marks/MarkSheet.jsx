import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spreadsheet from "react-spreadsheet";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { SemesterStudent } from "../../../Services/subjectServices";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { enterMarks } from "../../../Services/teacherServices";

export default function MarkSheet() {
  const { id } = useParams();
  const columnLabels = [
    "Student",
    "Mid-1",
    "Mid-2",
    "Quiz",
    "Practical",
    "End Semester",
  ];
  const [studentList, setStudentList] = useState([]);
  const [data, setData] = useState([]);
  // const [marks, setMarks] = useState([]);
  const [marksData, setMarksData] = useState([]);

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
        { value: "", button: <button>Button</button> },
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

  const handleExport = () => {
    exportToExcel(marksData);
  };

  const handleSubmit = async () => {
    const marksData = [];
    data.forEach((row, rowIndex) => {
      const studentId = studentList[rowIndex]._id;
      const studentMarks = {
        subject: id,
        student: studentId,
        marks: row.slice(1).map((cell) => cell.value),
      };
      marksData.push(studentMarks);
    });
    setMarksData(marksData);
    try {
      const responseData = await enterMarks(marksData);
      if (responseData.success === true) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Some error occured !");
      console.log(error);
    }
  };

  const exportToExcel = (data) => {
    const formattedData = data.map((studentMarks, index) => {
      const student = studentList[index]; // Fetch corresponding student from studentList
      return {
        Student: student.name,
        "Mid-1": studentMarks.marks[0],
        "Mid-2": studentMarks.marks[1],
        Quiz: studentMarks.marks[2],
        Practical: studentMarks.marks[3],
        "End Semester": studentMarks.marks[4],
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MarksSheet");

    // Generate a unique filename
    const fileName = `marks_sheet_${new Date().toISOString()}.xlsx`;

    // Trigger the file download
    XLSX.writeFile(wb, fileName);
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
                📝 Enter Marks
              </h1>
            </div>
            <div className="flex w-full items-center justify-center">
              <Spreadsheet
                className="text-xl font-semibold"
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
            <div className="mr-16 flex justify-end gap-2">
              <button
                onClick={handleExport}
                className="mt-8 rounded-md bg-darkPrimary p-2 text-xl font-semibold text-white duration-300 hover:rounded-[3rem] hover:bg-mintPrimary hover:text-black"
              >
                Export Sheet
              </button>
              <button
                onClick={handleSubmit}
                className="mt-8 rounded-md bg-red-600 p-2 text-xl font-semibold text-white duration-300 hover:rounded-[3rem] hover:bg-red-200 hover:text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
