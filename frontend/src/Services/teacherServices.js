import axios from "axios";

export const login = async (loginData) => {
  try {
    console.log(loginData);
    const { data } = await axios.post("api/teacher/login", loginData);
    console.log("Login Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (signupData) => {
  try {
    console.log(signupData);
    const { data } = await axios.post("api/teacher/signup", signupData);
    console.log("Signup Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllTeacher = async () => {
  try {
    const { data } = await axios.get("api/teacher/getAllTeacher");
    console.log("Get all teacher ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTeacher = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.delete(`api/teacher/delete/${id} `);
    console.log("Teacher teacher ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getATeacher = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.get(`api/teacher/manageTeacher/${id}`);
    console.log("Teacher teacher ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTeacherSubjects = async (id) => {
  try {
    // console.log(id);
    const { data } = await axios.get(`api/teacher/assignSubjects/${id}`);
    // console.log("Teacher teacher ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateATeacher = async (id, teacherData) => {
  try {
    console.log(id);
    console.log(teacherData);
    const { data } = await axios.put(`api/teacher/update/${id}`, teacherData);
    console.log("Teacher teacher ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const markAttendance = async (attendanceData) => {
  try {
    console.log(attendanceData);
    const response = await axios.post(
      "api/attendance/markAttendance",
      attendanceData,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const attendanceReport = async (subjectId, percentage) => {
  try {
    console.log(subjectId, " ", percentage);
    const response = await axios.get(
      `api/attendance/attendanceReport/${subjectId}?percentage=${percentage}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const marksReport = async (subjectId) => {
  try {
    console.log(subjectId);
    const response = await axios.get(`api/marks/marksReport/${subjectId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const enterMarks = async (marksData) => {
  try {
    console.log(marksData);
    const response = await axios.post("api/marks/enterMarks", marksData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const AttendanceReport = async (subjectId) => {
  try {
    console.log(subjectId);
    const response = await axios.get(
      `api/attendance/downloadAttendanceReport?subjectId=${subjectId}`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTimeTable = async (id) => {
  try {
    const response = await axios.get(`api/teacher/timetable/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = () =>
  localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null;

export const logout = () => {
  localStorage.removeItem("UserInfo");
};
