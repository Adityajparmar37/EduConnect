import { Route, Routes } from "react-router-dom";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
