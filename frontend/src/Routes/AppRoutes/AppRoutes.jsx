import { Route, Routes } from "react-router-dom";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AuthRoute from "../AuthRoutes/AuthRoutes";
import { Toaster } from "react-hot-toast";
import AdminHomePage from "../../Pages/Admin/AdminHomePage/AdminHomePage";
import TeacherDashboard from "../../Pages/Admin/TeacherDashboard/TeacherDashboard";
import CreateTeacher from "../../Pages/Admin/CreateTeacher/CreateTeacher";
import SubjectDashboard from "../../Pages/Admin/SubjectDashboard/SubjectDashboard";
import ManageTeacher from "../../Pages/Admin/ManageTeacher/ManageTeacher";
import ManageSubject from "../../Pages/Admin/ManageSubject/ManageSubject";
import UpdateSubject from "../../Pages/Admin/UpdateSubject/UpdateSubject";
import StudentDashboard from "../../Pages/Admin/StudentDashboard/StudentDashboard";
import ManageStudent from "../../Pages/Admin/ManageStudent/ManageStudent";
import UpdateStudent from "../../Pages/Admin/UpdateStudent/UpdateStudent";
import StudentHomePage from "../../Pages/Student/StudentHomePage/StudentHomePage";
import TeacherHomePage from "../../Pages/Teacher/TeacherHomePage/TeacherHomePage";
import Attendance from "../../Pages/Teacher/Attendance/Attendance";
import MarkSheet from "../../Pages/Teacher/Marks/MarkSheet";
import CreateStudent from "../../Pages/Admin/CreateStudent/CreateStudent";
import CreateSubject from "../../Pages/Admin/CreateSubject/CreateSubject";
import UpdateTeacher from "../../Pages/Admin/UpdateTeacher/UpdateTeacher";
import Marks from "../../Pages/Teacher/Marks/Marks";
import AttendanceList from "../../Pages/Teacher/Attendance/AttendanceList";
import Profile from "../../Components/Profile/Profile";
import ViewAttendance from "../../Pages/Student/Attendance/ViewAttendance";

export default function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* header and user */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />

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
        <Route
          path="/manageSubject"
          element={
            <AuthRoute>
              <ManageSubject />
            </AuthRoute>
          }
        />
        <Route
          path="/updateSubject/:id"
          element={
            <AuthRoute>
              <UpdateSubject />
            </AuthRoute>
          }
        />
        <Route
          path="/studentDashboard"
          element={
            <AuthRoute>
              <StudentDashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/manageStudent/"
          element={
            <AuthRoute>
              <ManageStudent />
            </AuthRoute>
          }
        />
        <Route
          path="/createStudent/"
          element={
            <AuthRoute>
              <CreateStudent />
            </AuthRoute>
          }
        />
        <Route
          path="/updateStudent/:id"
          element={
            <AuthRoute>
              <UpdateStudent />
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
        <Route
          path="/viewAttendance"
          element={
            <AuthRoute>
              <ViewAttendance />
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
        <Route
          path="/attendance"
          element={
            <AuthRoute>
              <Attendance />
            </AuthRoute>
          }
        />
        <Route
          path="/attendance/:id"
          element={
            <AuthRoute>
              <AttendanceList />
            </AuthRoute>
          }
        />
        <Route
          path="/marks"
          element={
            <AuthRoute>
              <Marks />
            </AuthRoute>
          }
        />
        <Route
          path="/marks/:id"
          element={
            <AuthRoute>
              <MarkSheet />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}
