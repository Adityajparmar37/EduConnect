import React, { useEffect } from "react";
import toast from "react-hot-toast";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import { useAuth } from "../../../Hooks/useAuth";
import { getMyAttendance } from "../../../Services/studentServices";

export default function ViewAttendance() {
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getMyAttendance(user._id);
        console.log(responseData);
      } catch (error) {
        console.log(error);
        toast.error("Please try again !");
      }
    };

    fetchData();
  },[]);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavStudent />
        </div>
        <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-14">
          <h1>Attendance View</h1>
        </div>
      </div>
    </>
  );
}
