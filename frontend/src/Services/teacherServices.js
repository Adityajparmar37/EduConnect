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

export const getUser = () =>
  localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null;

export const logout = () => {
  localStorage.removeItem("UserInfo");
};
