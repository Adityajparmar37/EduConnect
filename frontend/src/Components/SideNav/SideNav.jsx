import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { LuBookCopy } from "react-icons/lu";
import { LuHome } from "react-icons/lu";
import { MdPersonOutline } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function SideNav() {
  return (
    <div className="fixed left-0 top-0 mt-[3.8rem] flex h-full w-64 flex-col border-r-2 border-black bg-white shadow-md">
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col space-y-6 py-4">
          <li className="px-5">
            <div className="flex h-8 flex-row items-center">
              <div className="text-md font-light tracking-wide text-gray-500 ">
                Menu
              </div>
            </div>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <LuHome />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <FaChalkboardTeacher />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Teacher
              </span>
              <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium tracking-wide text-red-500">
                New
              </span>
            </Link>
          </li>
          <li>
            <a
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <PiStudentFill />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Student
              </span>
            </a>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <LuBookCopy />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Subject
              </span>
            </Link>
          </li>

          <li className="px-5">
            <div className="flex h-8 flex-row items-center">
              <div className="text-md font-light tracking-wide text-gray-500">
                Settings
              </div>
            </div>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <MdPersonOutline />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Profile
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-gray-600 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
            >
              <span className="ml-4 inline-flex items-center justify-center text-2xl">
                <RiLogoutBoxRLine />
              </span>
              <span className="text-md ml-2 truncate tracking-wide">
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
