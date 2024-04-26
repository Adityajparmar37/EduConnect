import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { getTimeTable } from "../../Services/teacherServices";
import SideNavTeacher from "../SideNav/SideNavTeacher";

const dayMappings = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const Timetable = () => {
  const { user } = useAuth();
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const response = await getTimeTable(user._id);
        console.log("Response:", response);
        if (response && response.subjects && Array.isArray(response.subjects)) {
          setTimetableData(response.subjects);
        } else {
          console.error(
            "Timetable data is not in the expected format:",
            response,
          );
        }
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, [user._id]);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="container mx-auto my-5">
          <h1 className="mb-14 mt-8 text-center text-2xl font-bold">
            Timetable
          </h1>
          <div className="border border-gray-800">
            <div className="flex text-xl font-bold">
              <div className="w-24 border-b border-r border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Time
              </div>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <div
                  key={day}
                  className="flex-1 border-b border-gray-800 bg-gray-200 p-2 py-2 text-center"
                >
                  {day}
                </div>
              ))}
            </div>
            {timetableData.map((subject) => (
              <div key={subject._id} className="flex font-semibold">
                <div className="w-24 border-b border-r border-gray-800 p-1 py-8 text-center">
                  {subject.timeRange}
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (shorthandDay, dayIndex) => {
                    const matchingEntries = subject.days.includes(shorthandDay);

                    return (
                      <div
                        key={dayIndex}
                        className={`flex-1 border-b border-r border-gray-800 p-2 py-2 text-center text-lg duration-300 hover:cursor-pointer ${
                          matchingEntries
                            ? subject.type === "Practical"
                              ? "bg-yellow-100 duration-300 hover:bg-transparent"
                              : subject.type === "Theory"
                                ? " bg-blue-100 hover:bg-transparent"
                                : "bg-green-100 hover:bg-transparent"
                            : ""
                        } hover:shadow-md`}
                      >
                        {matchingEntries ? (
                          <Link to={`/attendance/${subject.subject._id}`}>
                            <div
                              className={`rounded-sm ${
                                subject.type === "Theory"
                                  ? "bg-blue-100 duration-300 hover:bg-blue-300"
                                  : subject.type === "Tutorial"
                                    ? "bg-green-100 duration-300 hover:bg-green-300"
                                    : "bg-yellow-100 duration-300 hover:bg-yellow-300"
                              }`}
                            >
                              {`${subject.subject.subjectName} (${subject.subject.subjectNumber}) ${subject.batch !== "0" ? subject.batch : ""} - ${subject.type} - ${subject.classroom}`}
                            </div>
                          </Link>
                        ) : subject.timeRange === "01:30-02:00" ? (
                          <div className="cursor-not-allowed font-light">
                            Break
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
