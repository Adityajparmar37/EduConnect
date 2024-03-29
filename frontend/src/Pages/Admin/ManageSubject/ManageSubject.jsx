import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import TableCard from "../../../Components/TableCard/TableCard";
import { deleteSubject, getAllSubject } from "../../../Services/subjectServices";

export default function ManageSubject() {
  const [allSubject, setAllSubject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllSubject = await getAllSubject([]);
        console.log(responseAllSubject.subjects);
        setAllSubject(responseAllSubject.subjects);
      } catch (error) {
        console.log("Get all teacher frontend error", error);
        toast.error("Some error occurred, please try again!");
      }
    };

    fetchData();
  }, []);

  console.log(allSubject);

  const DeleteSubject = async (id) => {
    try {
      console.log(id);
      const responseData = await deleteSubject(id);
      if (responseData.success === true) {
        toast.success(responseData.message);
        setAllSubject((prevSubjects) =>
          prevSubjects.filter((subject) => subject._id !== id),
        );
      } else if (responseData.success === false) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

  // console.log(allSubject.length);
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-20">
        {allSubject && allSubject.length > 0 ? (
          <>
            <div className="flex w-full flex-col">
              <table className="w-full text-left  rtl:text-right">
                <thead className="border-b-4 border-white  text-[1rem] font-bold uppercase text-white dark:bg-primary">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <label className="text-xl font-bold text-white">
                          📕
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="border-l-2 px-6 py-3 ">
                      Subject Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subject Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Semester
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSubject && (
                    <TableCard
                      allSubject={allSubject}
                      DeleteSubject={DeleteSubject}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Link to="/subjectDashboard">
            <h1 className=" items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
              No Subject Found! Click to go back
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
}
