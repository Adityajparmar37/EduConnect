import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";
import TableCard from "../../Components/TableCard/TableCard";
import { getAllStudent } from "../../Services/studentServices";

export default function ManageStudent() {
  const [allStudent, setallStudent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllStudent = await getAllStudent([]);
        console.log(responseAllStudent);
        setallStudent(responseAllStudent);
      } catch (error) {
        console.log("Get all teacher frontend error", error);
        toast.error("Some error occurred, please try again!");
      }
    };

    fetchData();
  }, []);

  console.log(allStudent);
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-20">
        {allStudent && allStudent.length > 0 ? (
          <>
            <div className="flex w-full flex-col">
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
                      Student Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Student Semester
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allStudent &&
                    allStudent.map((Student, index) => (
                      <TableCard
                        key={Student._id}
                        Student={Student}
                        index={index}
                        // DeleteSubject={DeleteSubject}
                      />
                    ))}
                </tbody>
              </table>
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
  );
}
