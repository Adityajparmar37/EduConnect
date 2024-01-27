import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../Pages/AdminHomePage/AdminHomePage";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AuthRoute from "../AuthRoutes/AuthRoutes";
import { Toaster } from "react-hot-toast";

export default function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* header and user */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Page user type */}
        <Route
          path="/admin"
          element={
            <AuthRoute>
              <AdminHomePage />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}
