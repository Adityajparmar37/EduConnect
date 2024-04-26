import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { SemesterStudent } from "../../../Services/subjectServices";
import { enterMarks } from "../../../Services/teacherServices";

export default function MarkSheet() {
  const [studentList, setStudentList] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const { id } = useParams();
  const [isValid, setIsValid] = useState(true); // State to track mark validation

  // Fetch student list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SemesterStudent(id);
        setStudentList(response);
        // Initialize marksData array with empty arrays for each student
        setMarksData(response.map(() => [null, null, null, null, null, null]));
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!isValid) {
        alert("Invalid marks entered!");
        return;
      }
      const responseData = await enterMarks(marksData);
      if (responseData.success === true) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Some error occurred!");
      console.log(error);
    }
  };

  // Handle input change
  const handleInputChange = (e, studentIndex, markIndex) => {
    const newValue = e.target.value;
    const newMarksData = [...marksData];
    newMarksData[studentIndex][markIndex] = newValue;
    setMarksData(newMarksData);
  };

  // Calculate grand total for each student
  const calculateGrandTotal = (studentIndex) => {
    const mid1 = parseFloat(marksData[studentIndex][0]) || 0;
    const mid2 = parseFloat(marksData[studentIndex][1]) || 0;
    const totalMid = (mid1 + mid2) / 2;
    const quiz1 = parseFloat(marksData[studentIndex][2]) || 0;
    const quiz2 = parseFloat(marksData[studentIndex][3]) || 0;
    const practical = parseFloat(marksData[studentIndex][4]) || 0;
    const endSem = parseFloat(marksData[studentIndex][5]) || 0;
    const grandTotal = totalMid + quiz1 + quiz2 + practical + endSem;
    return grandTotal.toFixed(2);
  };

  // Check marks validation
  const checkMarksValidation = () => {
    let isValidMarks = true;
    let invalidMarksDetails = []; // Array to store details of invalid marks
    for (let i = 0; i < marksData.length; i++) {
      if (
        marksData[i][0] > 30 ||
        marksData[i][1] > 30 ||
        marksData[i][2] > 10 ||
        marksData[i][3] > 10 ||
        marksData[i][4] > 20 ||
        marksData[i][5] > 80
      ) {
        isValidMarks = false;
        setIsValid(false); // Set isValid state to false
        // Collect details of invalid marks
        invalidMarksDetails.push({
          student: studentList[i].name,
          invalidExams: [
            marksData[i][0] ? "Mid-1" : null,
            marksData[i][1] ? "Mid-2" : null,
            marksData[i][2] > 10 ? "Quiz-1" : null,
            marksData[i][3] > 10 ? "Quiz-2" : null,
            marksData[i][4] > 20 ? "Practical" : null,
            marksData[i][5] > 80 ? "End Semester" : null,
          ].filter((exam) => exam !== null),
        });
      }
    }
    if (isValidMarks) {
      setIsValid(true); // Set isValid state to true
    } else {
      // Display alert message with details of invalid marks
      let errorMessage = "Invalid marks entered for:\n\n";
      invalidMarksDetails.forEach((details) => {
        errorMessage += `Student: ${details.student} \nInvalid Makrs in Exams: ${details.invalidExams.join(", ")}\n\n`;
      });
      alert(errorMessage);
    }
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
              <table>
                <thead className="bg-gray-300">
                  <tr>
                    <th className=" border border-gray-800">Student</th>
                    <th className=" border border-gray-800">Mid-1</th>
                    <th className=" border border-gray-800">Mid-2</th>
                    <th className=" border border-gray-800">Quiz-1</th>
                    <th className=" border border-gray-800 ">Quiz-2</th>
                    <th className=" border border-gray-800">Practical</th>
                    <th className=" border border-gray-800">End Semester</th>
                    <th className=" border border-gray-800">Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student, studentIndex) => (
                    <tr key={studentIndex} className="border border-gray-800  ">
                      <td className="border border-gray-800 bg-gray-300 p-2 font-bold">
                        {student.name}
                      </td>
                      {[...Array(6).keys()].map((markIndex) => (
                        <td key={markIndex}>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            className="border border-black p-1 text-center font-bold outline-none"
                            value={marksData[studentIndex]?.[markIndex] || ""}
                            onChange={(e) =>
                              handleInputChange(e, studentIndex, markIndex)
                            }
                          />
                        </td>
                      ))}
                      <td className="text-center">
                        = {calculateGrandTotal(studentIndex)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mr-16 flex justify-end gap-2">
              <button
                onClick={checkMarksValidation}
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
