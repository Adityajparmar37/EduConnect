import React, { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import SideNav from "../SideNav/SideNav";
import SideNavStudent from "../SideNav/SideNavStudent";
import SideNavTeacher from "../SideNav/SideNavTeacher";
import { IoPersonOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";


export default function Profile() {
  const { user } = useAuth();
  const [userDetail, setUserDetails] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        {user && user.userType === "Admin" ? (
          <SideNav />
        ) : user && user.userType === "Teacher" ? (
          <SideNavTeacher />
        ) : (
          <SideNavStudent />
        )}
      </div>
      <div className="mr-5 flex w-5/6 flex-col pt-16">
        <div className="mb-12">
          <h1 className="mb-5 text-center text-3xl font-bold">
            🙋🏻 Your Profile
          </h1>
        </div>
        <div className="flex flex-col items-center  justify-center space-y-5  p-3 text-lg">
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Name :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="text"
              value={userDetail.name}
            />
          </div>
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Email :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="email"
              value={userDetail.email}
            />
          </div>
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Password :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="password"
              placeholder="Enter New Password"
              value={userDetail.password}
            />
          </div>
          <div className="mr-20 flex flex-row items-center">
            <h1 className="w-[180px] text-center text-lg font-semibold text-black">
              Confirm Password :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="password"
              placeholder="Enter New Password Again"
              value={userDetail.confirmPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
