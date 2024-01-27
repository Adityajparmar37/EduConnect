import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../Pages/AdminHomePage/AdminHomePage";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AuthRoute from "../AuthRoutes/AuthRoutes";
import { Toaster } from "react-hot-toast";
import StudentHomePage from "../../Pages/StudentHomePage/StudentHomePage";
import TeacherHomePage from "../../Pages/TeacherHomePage/TeacherHomePage";

export default function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* header and user */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* admin pages */}
        <Route
          path="/admin"
          element={
            <AuthRoute>
              <AdminHomePage />
            </AuthRoute>
          }
        />

        {/* student pages */}
        <Route
          path="/student"
          element={
            <AuthRoute>
              <StudentHomePage />
            </AuthRoute>
          }
        />

        {/* teacher pages */}
        <Route
          path="/teacher"
          element={
            <AuthRoute>
              <TeacherHomePage />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}
