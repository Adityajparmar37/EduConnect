import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import TableCardAttendance from "../../../Components/TableCard/TableCardAttendance";
import { SemesterStudent } from "../../../Services/subjectServices";
import {
  AttendanceReport,
  markAttendance,
} from "../../../Services/teacherServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceList() {
  const { id } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceToggle, setAttendanceToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await SemesterStudent(id);
      setStudentList(response);
      setAttendanceData(
        response.map((student) => ({
          SubjectId: id,
          Student: student._id,
          attendance: attendanceToggle ? 1 : 0,
          date: selectedDate.toISOString(), // Convert selected date to ISO format
        })),
      );
    };
    fetchData();
  }, [id, attendanceToggle, selectedDate]);

  const updateAttendance = (index, newAttendance) => {
    setAttendanceData((prevAttendanceData) => {
      const updatedData = [...prevAttendanceData];
      updatedData[index] = newAttendance;
      return updatedData;
    });
  };

  const handleAttendanceSubmit = async () => {
    try {
      console.log(attendanceData);
      const responseData = await markAttendance(attendanceData);
      if (responseData.success === true) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendanceReport = async () => {
    try {
      const response = await AttendanceReport(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleAttendance = () => {
    setAttendanceToggle(!attendanceToggle);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentList
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-14">
          {studentList && studentList.length > 0 ? (
            <>
              <div className="flex w-full flex-col">
                <div className="mb-12 text-center text-2xl font-bold">
                  ✅ Attendance
                </div>
                <div className="mb-3 flex justify-between">
                  <div className="flex flex-row gap-5">
                    <div>
                      <label className="text-center text-md font-bold">
                        Date :{" "}
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="mr-5 rounded-md border border-gray-400 px-2 py-1 text-md font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-center text-md font-bold">
                        Search :{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="Search by Student Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-3 rounded-md border border-gray-400 px-2 py-1 text-md font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleToggleAttendance}
                      className={`${
                        attendanceToggle
                          ? "bg-red-600 hover:bg-red-200"
                          : "bg-green-600 hover:bg-green-200"
                      } mr-5 rounded-md  p-2 text-xl font-semibold text-white duration-300 hover:rounded-[3rem] hover:text-black`}
                    >
                      {attendanceToggle
                        ? "Make All Absent"
                        : "Make All Present"}
                    </button>
                  </div>
                </div>

                <table className="w-full text-left rtl:text-right">
                  <thead className="border-b-4 border-white text-[1rem] font-bold uppercase text-white dark:bg-primary">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center justify-center">
                          <label className="text-lg font-bold text-white">
                            🧑🏻‍🎓
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="border-l-2 px-6 py-3">
                        Student Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Student Semester
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((student, index) => (
                      <TableCardAttendance
                        subjectId={id}
                        key={student._id}
                        student={student}
                        index={index}
                        initialAttendance={
                          attendanceToggle ? "Present" : "Absent"
                        }
                        updateAttendance={updateAttendance}
                        selectedDate={selectedDate}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="mr-16 flex justify-end">
                  <button
                    onClick={handleAttendanceSubmit}
                    className="mt-8 rounded-md bg-red-600 p-2 text-xl font-semibold text-white duration-300 hover:rounded-[3rem] hover:bg-red-200 hover:text-black"
                  >
                    Submit
                  </button>
                </div>
                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                  <ul className="flex space-x-2">
                    {Array.from(
                      { length: Math.ceil(studentList.length / itemsPerPage) },
                      (_, i) => (
                        <li key={i}>
                          <button
                            className={`${
                              currentPage === i + 1
                                ? "bg-gray-600 text-white"
                                : "bg-white text-gray-600"
                            } rounded-md px-3 py-1`}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <Link to="/teacher">
              <h1 className="items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Student Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
