import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import { getMyMarks } from "../../../Services/studentServices";

export default function ViewMarks() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMarks = await getMyMarks();
        console.log(responseMarks);
      } catch (error) {
        console.log("Marks viewing error ", error);
        toast.error("Please try again");
      }
    };
    fetchData();
  });
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavStudent />
      </div>
      <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-14">
        View Marks
      </div>
    </div>
  );
}
