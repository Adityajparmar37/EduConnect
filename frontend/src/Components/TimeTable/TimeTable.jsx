import React, { useState, useEffect } from "react";
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

const timeRanges = [
  { startTime: "10:30 AM", endTime: "11:30 AM" },
  { startTime: "11:30 AM", endTime: "12:30 PM" },
  { startTime: "12:30 PM", endTime: "01:30 PM" },
  { startTime: "01:30 PM", endTime: "02:00 PM" },
  { startTime: "02:00 PM", endTime: "03:00 PM" },
  { startTime: "03:00 PM", endTime: "04:00 PM" },
  { startTime: "04:00 PM", endTime: "05:00 PM" },
  { startTime: "05:00 PM", endTime: "06:00 PM" },
];

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
            {timeRanges.map((timeRange, index) => (
              <div key={index} className="flex font-semibold">
                <div className="w-24 border-b border-r border-gray-800 p-2 py-2 text-center">
                  {timeRange.startTime} - {timeRange.endTime}
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (shorthandDay, dayIndex) => {
                    const matchingEntries = timetableData.filter((entry) => {
                      const startTimeStr =
                        entry.startTime.hour +
                        ":" +
                        entry.startTime.minute +
                        " " +
                        entry.startTime.period;
                      const endTimeStr =
                        entry.endTime.hour +
                        ":" +
                        entry.endTime.minute +
                        " " +
                        entry.endTime.period;
                      const duration =
                        entry.endTime.hour - entry.startTime.hour;
                      {
                        console.log(
                          startTimeStr + " " + endTimeStr + " " + duration,
                        );
                      }
                      return (
                        entry.days.includes(shorthandDay) &&
                        timeRange.startTime === startTimeStr
                      );
                    });

                    return (
                      <div
                        key={dayIndex}
                        className="flex-1 border-b border-r border-gray-800 p-2 py-2 text-center text-lg duration-300 hover:cursor-pointer hover:bg-gray-50 hover:shadow-lg"
                      >
                        {matchingEntries.length > 0 ? (
                          <>
                            {console.log(matchingEntries)}
                            {matchingEntries.some(
                              (entry) => entry.type === "Theory",
                            ) && (
                              <div className="rounded-md bg-blue-100 duration-300 hover:bg-blue-200">
                                {matchingEntries
                                  .filter((entry) => entry.type === "Theory")
                                  .map((entry, entryIndex) => (
                                    <div key={entryIndex}>
                                      {`${entry.subject.subjectName + " " + "(" + entry.subject.subjectNumber + ")"}${entry.batch !== "0" ? "" + entry.batch : ""} - ${entry.type} - ${entry.classroom}`}
                                    </div>
                                  ))}
                              </div>
                            )}
                            {matchingEntries.some(
                              (entry) => entry.type === "Practical",
                            ) && (
                              <div className="rounded-md bg-yellow-100 duration-300 hover:bg-yellow-200">
                                {/* Filter and map only practical subjects with 2-hour duration */}
                                {matchingEntries
                                  .filter((entry) => entry.type === "Practical")
                                  .map((entry, entryIndex) => (
                                    <div key={entryIndex}>
                                      {`${entry.subject.subjectName + " " + "(" + entry.subject.subjectNumber + ")"} - ${entry.type} : ${entry.batch}  ${entry.classroom}`}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div>-</div>
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
