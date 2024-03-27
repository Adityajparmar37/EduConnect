import React, { useState } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import Card from "../../../Components/Card/Card";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import Modal from "react-modal";

export default function TeacherHomePage() {
  document.body.style.overflow = "hidden";

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavTeacher />
      </div>
      <div className="flex h-auto w-5/6 px-3 pt-20">
        <div className="grid grid-cols-3 gap-24">
          <Card
            link="/attendance"
            bgColor="darkPrimary"
            icon={<TbHexagonLetterA />}
            icon2={<IoArrowForwardSharp />}
            title="Attendance"
            text={["Mark student attendance"]}
          />
          <Card
            link="/marks"
            bgColor="darkPrimary"
            icon={<LiaFileUploadSolid />}
            icon2={<IoArrowForwardSharp />}
            title="Upload Marks"
            text={["Upload subject Marks"]}
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
