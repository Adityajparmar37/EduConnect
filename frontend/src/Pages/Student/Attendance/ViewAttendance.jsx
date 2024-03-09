import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import TableCardViewAttendance from "../../../Components/TableCard/TableCardViewAttendance";
import { useAuth } from "../../../Hooks/useAuth";
import { getMyAttendance } from "../../../Services/studentServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ViewAttendance() {
  const { user } = useAuth();
  const [myAttendance, setMyAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortNewest, setSortNewest] = useState(true); // true for newest, false for oldest

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getMyAttendance(user._id);
        setMyAttendance(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Apply filters on myAttendance array
  const filteredAttendance = myAttendance.filter((atten) => {
    const date = new Date(atten.createdAt);
    return (
      atten.subjectId.subjectName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (!startDate || date >= startDate) &&
      (!endDate || date <= endDate)
    );
  });

  // Sort the filtered attendance based on sortNewest
  const sortedAttendance = [...filteredAttendance].sort((a, b) => {
    if (sortNewest) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Count total present attendance
  const totalPresentAttendance = filteredAttendance.filter(
    (attendance) => attendance.attendance === 1,
  ).length;

  // Calculate percentage of present attendance
  const totalAttendanceCount = filteredAttendance.length;
  const presentAttendancePercentage =
    totalAttendanceCount === 0
      ? 0
      : (totalPresentAttendance / totalAttendanceCount) * 100;

  let colorClass;
  if (presentAttendancePercentage >= 70) {
    colorClass = "bg-green-500";
  } else if (presentAttendancePercentage >= 50) {
    colorClass = "bg-yellow-500";
  } else {
    colorClass = "bg-red-500";
  }

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
                <h1 className="mb-8 text-center text-2xl font-bold">
                  ✅ Attendance
                </h1>
                <div className="mb-8 flex flex-row items-center justify-center">
                  <div>
                    <label className="mr-2 text-lg font-semibold">Search</label>
                    <input
                      type="text"
                      placeholder="Search by subject name"
                      value={searchTerm}
                      className="rounded-md border-2 p-1 focus:border-2"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="ml-8 flex justify-evenly text-lg font-semibold ">
                    <label>From:</label>
                    <DatePicker
                      className="ml-2 mr-5 rounded-md border-2"
                      placeholder="Click"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <label>To:</label>
                    <DatePicker
                      className="ml-2 rounded-md border-2"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>

                  <div className="flex items-center text-lg">
                    <label className="ml-5 mr-3 font-semibold">Sort :</label>
                    <input
                      type="radio"
                      value="new"
                      checked={sortNewest}
                      onChange={() => setSortNewest(true)}
                    />
                    <label htmlFor="newest" className="ml-2 mr-2">
                      New
                    </label>
                    <input
                      type="radio"
                      value="old"
                      checked={!sortNewest}
                      onChange={() => setSortNewest(false)}
                    />
                    <label htmlFor="newest" className="ml-2 mr-2">
                      Old
                    </label>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold">
                      Total Present :{" "}
                      <span className="font-light">
                        {totalPresentAttendance}
                      </span>
                    </h2>
                  </div>
                </div>
                <table className="w-full text-left rtl:text-right">
                  {/* Table header */}
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
                    {sortedAttendance.map((atten, index) => (
                      <TableCardViewAttendance
                        key={index}
                        index={index}
                        subjectName={atten.subjectId.subjectName}
                        subjectNumber={atten.subjectId.subjectNumber}
                        attendanced={atten.attendance}
                        Date={new Date(atten.createdAt).toLocaleDateString(
                          "en-US",
                        )}
                      />
                    ))}
                  </tbody>
                </table>
                <div
                  className={`absolute bottom-0 right-0 mb-16 mr-10 rounded-[2rem] p-3 text-2xl font-semibold text-white ${colorClass}`}
                >
                  {presentAttendancePercentage.toFixed(1)}%
                </div>
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
