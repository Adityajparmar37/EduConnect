import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubjectCard from "../../../Components/Card/SubjectCard";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { useAuth } from "../../../Hooks/useAuth";
import { getTeacherSubjects } from "../../../Services/teacherServices";

export default function Attendance() {
  const { user } = useAuth();
  const [semSubject, setSemSubject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherSubjects(user._id);
        console.log(response);
        // Extracting subjectIds from response and updating state
        setSemSubject(response.map((item) => item.subjectId));
      } catch (error) {
        toast.error("Please try again");
        console.log("Error in fetching subject for a semester", error);
      }
    };
    fetchData();
  }, []);

  console.log(semSubject);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavTeacher />
      </div>
      <div className="flex w-5/6 flex-col pt-16 mr-5">
        <div className="mb-12 border-b-[2px] border-black">
          <h1 className="text-center text-3xl font-bold mb-5">📚 Your Subject</h1>
        </div>
        <SubjectCard semSubject={semSubject} />
      </div>
    </div>
  );
}
