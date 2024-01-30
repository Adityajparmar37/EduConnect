import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../../Pages/AdminHomePage/AdminHomePage";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AuthRoute from "../AuthRoutes/AuthRoutes";
import { Toaster } from "react-hot-toast";
import StudentHomePage from "../../Pages/StudentHomePage/StudentHomePage";
import TeacherHomePage from "../../Pages/TeacherHomePage/TeacherHomePage";
import TeacherDashboard from "../../Pages/TeacherDashboard/TeacherDashboard";
import CreateTeacher from "../../Pages/CreateTeacher/CreateTeacher";
import SubjectDashboard from "../../Pages/SubjectDashboard/SubjectDashboard";
import CreateSubject from "../../Pages/CreateSubject/CreateSubject";
import ManageTeacher from "../../Pages/ManageTeacher/ManageTeacher";
import UpdateTeacher from "../../Pages/UpdateTeacher/UpdateTeacher";

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
        <Route
          path="/teacherDashboard"
          element={
            <AuthRoute>
              <TeacherDashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/createTeacher"
          element={
            <AuthRoute>
              <CreateTeacher />
            </AuthRoute>
          }
        />
        <Route
          path="/subjectDashboard"
          element={
            <AuthRoute>
              <SubjectDashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/createSubject"
          element={
            <AuthRoute>
              <CreateSubject />
            </AuthRoute>
          }
        />
        <Route
          path="/manageTeacher"
          element={
            <AuthRoute>
              <ManageTeacher />
            </AuthRoute>
          }
        />
        <Route
          path="/updateTeacher/:id"
          element={
            <AuthRoute>
              <UpdateTeacher />
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
