import React from "react";
import SideNav from "../../Components/SideNav/SideNav";
import { useAuth } from "../../Hooks/useAuth";

export default function UploadFiles() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="lg:w-1/6">
          <SideNav />
        </div>
      </div>
    </>
  );
}
