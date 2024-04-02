import { Route, Routes, Navigate } from "react-router-dom";
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
import ViewMarks from "../../Pages/Student/Marks/ViewMarks";
import DiscussionForum from "../../Pages/DiscussionForum/DiscussionForum";
import { useAuth } from "../../Hooks/useAuth";
import UnauthorizedMessage from "../../Components/Unauthorized/UnauthorizedMessage";

export default function AppRoutes() {
  const { user } = useAuth();

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
            user ? (
              <AuthRoute>
                <Profile />
              </AuthRoute>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* admin pages */}
        {user && user.userType === "admin" && (
          <>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
            <Route path="/createTeacher" element={<CreateTeacher />} />
            <Route path="/subjectDashboard" element={<SubjectDashboard />} />
            <Route path="/createSubject" element={<CreateSubject />} />
            <Route path="/manageTeacher" element={<ManageTeacher />} />
            <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
            <Route path="/manageSubject" element={<ManageSubject />} />
            <Route path="/updateSubject/:id" element={<UpdateSubject />} />
            <Route path="/studentDashboard" element={<StudentDashboard />} />
            <Route path="/manageStudent/" element={<ManageStudent />} />
            <Route path="/createStudent/" element={<CreateStudent />} />
            <Route path="/updateStudent/:id" element={<UpdateStudent />} />
          </>
        )}

        {/* student pages */}
        {user && user.userType === "student" && (
          <>
            <Route path="/student" element={<StudentHomePage />} />
            <Route path="/viewAttendance" element={<ViewAttendance />} />
            <Route path="/viewMarks" element={<ViewMarks />} />
            <Route path="/discussionForum" element={<DiscussionForum />} />
          </>
        )}

        {/* teacher pages */}
        {user && user.userType === "teacher" && (
          <>
            <Route path="/teacher" element={<TeacherHomePage />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/:id" element={<AttendanceList />} />
            <Route path="/marks" element={<Marks />} />
            <Route path="/marks/:id" element={<MarkSheet />} />
          </>
        )}

        {/* Unauthorized access message */}
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        <Route path="/unauthorized" element={<UnauthorizedMessage />} />
      </Routes>
    </>
  );
}
