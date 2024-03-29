import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import Card from "../../../Components/Card/Card";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";

export default function StudentHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavStudent />
      </div>
      <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
        <div className="grid grid-cols-3 gap-24">
          <Card
            link="/viewAttendance"
            bgColor="darkPrimary"
            icon={<TbHexagonLetterA />}
            icon2={<IoArrowForwardSharp />}
            title="View Attendance"
            text={["View your attendance"]}
          />
          <Card
            link="/viewMarks"
            bgColor="darkPrimary"
            icon={<LiaFileUploadSolid />}
            icon2={<IoArrowForwardSharp />}
            title="View Marks"
            text={["View your Marks", "Marks of each Subject"]}
          />

          <Card
            link="/discussionForum"
            bgColor="darkPrimary"
            icon={<PiChatsFill />}
            icon2={<IoArrowForwardSharp />}
            title="Discussion forum"
            text={[
              "Discuss your doubt with teacher",
              "One to One doubt solving",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
