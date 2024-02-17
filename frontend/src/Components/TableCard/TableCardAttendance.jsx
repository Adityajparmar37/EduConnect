import React, { useEffect, useState } from "react";

const TableCardAttendance = ({ Student, index }) => {
  const currentDate = new Date().toLocaleDateString();
  console.log(Student);

  const [attendance, setAttendance] = useState({
    buttonText: "Present",
    buttonColor: "bg-green-400",
  });

  const handleAttendanceToggle = () => {
    setAttendance((prevAttendance) => ({
      buttonText:
        prevAttendance.buttonText === "Present" ? "Absent" : "Present",
      buttonColor:
        prevAttendance.buttonText === "Present" ? "bg-red-600" : "bg-green-600",
    }));
  };

  return (
    <>
      {Student && (
        <tr
          className={`text-dark border-b-2 bg-white font-semibold hover:bg-gray-50`}
        >
          <td className={`w-4 p-4`}>
            <div className="flex items-center">{index + 1}</div>
          </td>
          <th
            scope="row"
            className={`whitespace-nowrap px-6 py-4 text-lg font-bold text-darkPrimary`}
          >
            {Student.name}
          </th>
          <td className={`px-6 py-4 text-lg`}>
            {" "}
            {Student.CurrentSemester.semesterNumber}
          </td>
          <td className={`px-6 py-4 text-lg`}>
            <h1 className={`rounded-lg p-1 text-lg`}>{currentDate}</h1>
          </td>
          <td className={`px-6 py-4`}>
            <div className="flex space-x-5">
              <button
                className={`rounded-md p-1 text-xl font-bold duration-200 hover:rounded-full hover:text-white dark:text-white ${attendance.buttonColor}`}
                onClick={handleAttendanceToggle}
              >
                {attendance.buttonText}
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableCardAttendance;
