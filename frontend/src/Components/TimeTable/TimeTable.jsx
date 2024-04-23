import React from "react";
import SideNavTeacher from "../SideNav/SideNavTeacher";

const Timetable = () => {
  const timetableData = [
    {
      day: "Monday",
      time: "10:30 AM - 11:30 AM",
      subject: "Maths",
      batchName: "Batch A",
      type: "Theory",
      classroom: "101",
    },
    {
      day: "Tuesday",
      time: "12:30 AM - 1:30 AM",
      subject: "Physics",
      batchName: "Batch B",
      type: "Practical",
      classroom: "102",
    },
    // Add more entries for each day and time
  ];

  const timeSlots = [
    "10:30 AM - 11:30 AM",
    "11:30 AM - 12:30 AM",
    "12:30 AM - 1:30 AM",
    "1:30 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="container  mx-auto my-5">
          <h1 className="mb-4 text-center text-2xl font-bold">Timetable</h1>
          <div className="border border-gray-800">
            <div className="flex text-xl font-bold">
              <div className="w-24 border-b border-r border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Time
              </div>
              <div className="flex-1 border-b  border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Monday
              </div>
              <div className="flex-1 border-b  border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Tuesday
              </div>
              <div className="flex-1 border-b  border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Wednesday
              </div>
              <div className="flex-1 border-b  border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Thursday
              </div>
              <div className="flex-1 border-b  border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Friday
              </div>
              <div className="flex-1 border-b border-gray-800 bg-gray-200 py-2 text-center">
                Saturday
              </div>
            </div>
            {/* Render timetable data */}
            {timeSlots.map((timeSlot, index) => (
              <div key={index} className="flex font-semibold">
                <div className="w-24 border-b border-r border-gray-800 p-2 py-2 text-center">
                  {timeSlot}
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
                    className="flex-1 border-b border-r border-gray-800 p-2 py-2 text-center text-lg duration-300 hover:bg-gray-100 hover:text-blue-500"
                  >
                    {timetableData.find(
                      (item) => item.day === day && item.time === timeSlot,
                    )
                      ? `${timetableData.find((item) => item.day === day && item.time === timeSlot).subject} - ${timetableData.find((item) => item.day === day && item.time === timeSlot).batchName} - ${timetableData.find((item) => item.day === day && item.time === timeSlot).type} - ${timetableData.find((item) => item.day === day && item.time === timeSlot).classroom}`
                      : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
