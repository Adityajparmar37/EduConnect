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
    console.log(id);
    const { data } = await axios.get(`api/teacher/assignSubjects/${id}`);
    console.log("Teacher teacher ==> ", data);
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
    const { data } = await axios.get("api/attendance/markAttendance", {
      params: {attendanceData},
    });
    console.log(data);
    return data;
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
