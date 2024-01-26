import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../Pages/AdminHomePage/AdminHomePage";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* header and user */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Page user type */}
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </>
  );
}
