import React, { useState } from "react";

const TableCardAttendance = ({ student, index, updateAttendance }) => {
  const currentDate = new Date().toLocaleDateString();
  const [attendance, setAttendance] = useState("Present");

  const handleAttendanceToggle = () => {
    const newAttendance = attendance === "Present" ? "Absent" : "Present";
    setAttendance(newAttendance);
    updateAttendance(index, {
      Student: student._id,
      attendance: newAttendance,
    });
  };

  return (
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
        {student.name}
      </th>
      <td className={`px-6 py-4 text-lg`}>
        {student.CurrentSemester.semesterNumber}
      </td>
      <td className={`px-6 py-4 text-lg`}>
        <h1 className={`rounded-lg p-1 text-lg`}>{currentDate}</h1>
      </td>
      <td className={`px-6 py-4`}>
        <div className="flex space-x-5">
          <button
            className={`rounded-md p-1 text-xl font-light duration-200 hover:rounded-full hover:text-white dark:text-white bg-${attendance === "Present" ? "green-600" : "red-600"}`}
            onClick={handleAttendanceToggle}
          >
            {attendance}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableCardAttendance;
