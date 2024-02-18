import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import TableCardAttendance from "../../../Components/TableCard/TableCardAttendance";
import { SemesterStudent } from "../../../Services/subjectServices";

export default function AttendanceList() {
  const { id } = useParams();
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await SemesterStudent(id);
      console.log(response);
      setStudentList(response);
    };
    fetch();
  }, []);

  console.log(studentList);

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
                <h1 className="text-center text-2xl font-bold mb-5">✅ Attendace</h1>
                <table className="w-full text-left  rtl:text-right">
                  <thead className="border-b-4 border-white  text-[1rem] font-bold uppercase text-white dark:bg-primary">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center justify-center">
                          <label className="text-lg font-bold text-white">
                            🧑🏻‍🎓
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="border-l-2 px-6 py-3 ">
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
                    {studentList &&
                      studentList.map((Student, index) => (
                        <TableCardAttendance
                          key={Student._id}
                          Student={Student}
                          index={index}
                        />
                      ))}
                  </tbody>
                </table>
                <div className="mr-16 flex justify-end ">
                  <button className="mt-8 rounded-md bg-red-600 p-2 text-xl text-white hover:rounded-[3rem] hover:bg-red-200 hover:text-black font-semibold duration-300">
                    Submit
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/studentDashboard">
              <h1 className=" items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Student Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
