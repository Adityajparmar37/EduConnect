import SideNav from "../../Components/SideNav/SideNav";
import Card from "../../Components/Card/Card";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { LuBookCopy } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";

export default function AdminHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
        <div className="grid grid-cols-3 gap-24">
          <Card
            link="/teacherDashboard"
            bgColor="primary"
            icon={<FaChalkboardTeacher />}
            icon2={<IoArrowForwardSharp />}
            title="Teacher Dashboard"
            text={["Manage Teacher", "Add New Teacher"]}
          />
          <Card
            link="/"
            bgColor="primary"
            icon={<PiStudentFill />}
            icon2={<IoArrowForwardSharp />}
            title="Student Dashboard"
            text={["Manage Student", "Update Student Details"]}
          />

          <Card
            link="/"
            bgColor="primary"
            icon={<LuBookCopy />}
            icon2={<IoArrowForwardSharp />}
            title="Subject Dashboard"
            text={["Manage Subject", "Update or add new subject"]}
          />
        </div>
      </div>
    </div>
  );
}
