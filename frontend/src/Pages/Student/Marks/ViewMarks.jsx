import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import Spreadsheet from "react-spreadsheet";
import { getMyMarks } from "../../../Services/studentServices";

export default function ViewMarks() {
  const [marksData, setMarksData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMarks = await getMyMarks();
        setMarksData(responseMarks);
      } catch (error) {
        console.log("Marks viewing error ", error);
        toast.error("Please try again");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Populate initial data with subject names
    if (marksData.length > 0) {
      const initialData = marksData.map((marks) => [
        { value: marks.SubjectId.subjectName },
        { value: marks.Marks[0], button: <button>Button</button> },
        { value: marks.Marks[1], button: <button>Button</button> },
        { value: marks.Marks[2], button: <button>Button</button> },
        { value: marks.Marks[3], button: <button>Button</button> },
        { value: marks.Marks[4], button: <button>Button</button> },
      ]);
      setData(initialData);
    }
  }, [marksData]);

  const columnLabels = [
    "Subject",
    "Mid-1",
    "Mid-2",
    "Quiz",
    "Practical",
    "End Semester",
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavStudent />
      </div>
      <div className="w-5/6">
        <div className="pt-10">
          <div className="mb-12">
            <h1 className="mb-5 text-center text-3xl font-bold">
              📝 Your Marks
            </h1>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="pointer-events-none text-lg font-semibold">
              <Spreadsheet
                data={data}
                columnLabels={columnLabels}
                readonly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
