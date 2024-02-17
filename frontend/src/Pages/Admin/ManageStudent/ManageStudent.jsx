import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import TableCard from "../../../Components/TableCard/TableCard";
import { deleteStudent, getAllStudent } from "../../../Services/studentServices";

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
  const DeleteStudent = async (id) => {
    try {
      console.log(id);
      const responseData = await deleteStudent(id);
      if (responseData.success === true) {
        toast.success(responseData.message);
        setallStudent((prevStudent) =>
          prevStudent.filter((student) => student._id !== id),
        );
      } else if (responseData.success === false) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

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
                        DeleteStudent={DeleteStudent}
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
