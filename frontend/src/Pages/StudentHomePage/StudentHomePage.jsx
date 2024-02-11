import React from "react";
import { BsPersonVideo2 } from "react-icons/bs";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import Card from "../../Components/Card/Card";
import SideNav from "../../Components/SideNav/SideNav";

export default function StudentHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
        <div className="grid grid-cols-3 gap-24">
          <Card
            link="/uploadFiles"
            bgColor="darkPrimary"
            icon={<LiaFileUploadSolid />}
            icon2={<IoArrowForwardSharp />}
            title="Upload File"
            text={["Upload your submission", "Upload Assignment"]}
          />
          <Card
            link="/studentDashboard"
            bgColor="darkPrimary"
            icon={<TbHexagonLetterA />}
            icon2={<IoArrowForwardSharp />}
            title="View Attendance"
            text={["View your attendance"]}
          />

          <Card
            link="/subjectDashboard"
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
