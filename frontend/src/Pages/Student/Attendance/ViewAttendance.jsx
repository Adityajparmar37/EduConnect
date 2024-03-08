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
                <div className="mb-4 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Search by subject name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div>
                    <label>From:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <label>To:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                  <button onClick={() => setSortNewest(!sortNewest)}>
                    {sortNewest ? "Sort Oldest" : "Sort Newest"}
                  </button>
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
                        Date={atten.createdAt.slice(0, 10)}
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
