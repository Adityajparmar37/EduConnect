import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import TableCardViewAttendance from "../../../Components/TableCard/TableCardViewAttendance";
import { useAuth } from "../../../Hooks/useAuth";
import { getMyAttendance } from "../../../Services/studentServices";

export default function ViewAttendance() {
  const { user } = useAuth();
  // console.log(user);
  const [myAttendance, setMyAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getMyAttendance(user._id);
        console.log(responseData);
        setMyAttendance(responseData);
      } catch (error) {
        console.log(error);
        toast.error("Please try again !");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavStudent />
        </div>
        <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-14">
          {myAttendance && myAttendance.length > 0 ? (
            <>
              <div className="flex w-full flex-col">
                <h1 className="mb-5 text-center text-2xl font-bold">
                  ✅ Attendance
                </h1>
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
                        Subject Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subject Number
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
                    {myAttendance.map((atten, index) => (
                      <TableCardViewAttendance
                        index={index}
                        subjectName={atten.subjectId.subjectName}
                        subjectNumber={atten.subjectId.subjectNumber}
                        attendanced={atten.attendance}
                        Date={atten.createdAt.slice(0,10)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <Link to="/studentDashboard">
              <h1 className="items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
