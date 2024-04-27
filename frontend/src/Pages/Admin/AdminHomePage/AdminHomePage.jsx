import SideNav from "../../../Components/SideNav/SideNav";
import Card from "../../../Components/Card/Card";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiAddressBook, PiStudentFill } from "react-icons/pi";
import { LuBookCopy } from "react-icons/lu";
import { IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineGroupAdd } from "react-icons/md";
import { TbBook2 } from "react-icons/tb";
import { RiBookletLine } from "react-icons/ri";
import { GoPersonAdd } from "react-icons/go";
import { BsPersonVideo2 } from "react-icons/bs";
import HomePageProfile from "../../../Components/Profile/HomePageProfile";

export default function AdminHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="flex h-auto w-full px-3 pt-[3rem] ml-20">
        <div className="flex flex-col gap-y-10 w-1/2">
          <Card
            link="/createTeacher"
            bgColor="darkPrimary"
            icon={<MdOutlineGroupAdd />}
            icon2={<IoArrowForwardSharp />}
            title="New Teacher"
            text={["Add New Teacher", "Create New Teacher Credentials"]}
          />
          <Card
            link="/manageTeacher"
            bgColor="darkPrimary"
            icon={<PiAddressBook />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Teacher"
            text={["Update Teacher Details", "Delete Teacher Details"]}
          />
          <Card
            link="/createStudent"
            bgColor="darkPrimary"
            icon={<GoPersonAdd />}
            icon2={<IoArrowForwardSharp />}
            title="New Student"
            text={["Add New Student", "Add Student Details"]}
          />
          <Card
            link="/manageStudent"
            bgColor="darkPrimary"
            icon={<BsPersonVideo2 />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Student"
            text={["Update Subject Details", "Delete Subject Details"]}
          />

          <Card
            link="/createSubject"
            bgColor="darkPrimary"
            icon={<TbBook2 />}
            icon2={<IoArrowForwardSharp />}
            title="New Subject"
            text={["Add New Subject", "Add Subject Details"]}
          />
          <Card
            link="/manageSubject"
            bgColor="darkPrimary"
            icon={<RiBookletLine />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Subject"
            text={["Update Subject Details", "Delete Subject Details"]}
          />
        </div>
        <div className="w-1/2 flex justify-between">
          <HomePageProfile />
        </div>
      </div>
    </div>
  );
}
