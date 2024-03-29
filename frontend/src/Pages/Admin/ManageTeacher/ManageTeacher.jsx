import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import TableCard from "../../../Components/TableCard/TableCard";
import { getAllTeacher } from "../../../Services/teacherServices";
import { deleteTeacher } from "../../../Services/teacherServices";

export default function ManageTeacher() {
  const [allTeacher, setAllTeacher] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllTeacher = await getAllTeacher([]);
        console.log(responseAllTeacher);
        setAllTeacher(responseAllTeacher);
      } catch (error) {
        console.log("Get all teacher frontend error", error);
        toast.error("Some error occurred, please try again!");
      }
    };

    fetchData();
  }, []);

  const DeleteTeacher = async (id) => {
    try {
      console.log(id);
      const responseData = await deleteTeacher(id);
      if (responseData.success === true) {
        toast.success(responseData.message);
        setAllTeacher((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== id),
        );
      } else if (responseData.success === false) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-20">
        {allTeacher && allTeacher.length > 0 ? (
          <>
            <div className="flex w-full flex-col">
              <table className="w-full text-left  rtl:text-right">
                <thead className="border-b-4 border-white  text-[1rem] font-bold uppercase text-white dark:bg-primary">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <label className="text-lg font-bold text-white">
                          👩🏻‍🏫
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="border-l-2 px-6 py-3 ">
                      Teacher Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Teacher Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Teacher Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allTeacher &&
                    allTeacher.map((teacher, index) => (
                      <TableCard
                        key={teacher._id}
                        teacher={teacher}
                        index={index}
                        DeleteTeacher={DeleteTeacher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Link to="/teacherDashboard">
            <h1 className=" items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
              No Teacher Found! Click to go back
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
}
