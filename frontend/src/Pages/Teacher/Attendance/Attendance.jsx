import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubjectCard from "../../../Components/Card/SubjectCard";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { useAuth } from "../../../Hooks/useAuth";
import { getATeacher } from "../../../Services/teacherServices";

export default function Attendance() {
  const { user } = useAuth();
  const [semSubject, setSemSubject] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getATeacher(user._id);
        // console.log(response);
        if (response._id === user._id) {
          // console.log(response.subjects[0]);
          setSemSubject(response.subjects);
        } else {
          toast.error(response.message || "Error fetching subjects");
        }
      } catch (error) {
        toast.error("Please try again");
        console.log("Error in fetching subject for a semester", error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavTeacher />
      </div>
      <div className="flex w-5/6 flex-col pt-16">
        <h1 className="mb-10 text-center text-3xl font-bold ">Your Subject</h1>
        <SubjectCard semSubject={semSubject} />
      </div>
    </div>
  );
}
