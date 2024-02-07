import axios from "axios";

export const login = async (loginData) => {
  try {
    console.log(loginData);
    const { data } = await axios.post("api/student/login", loginData);
    console.log("Login Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (signupData) => {
  try {
    const { data } = await axios.post("api/student/signup", signupData);
    console.log("Signup Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllStudent = async () => {
  try {
    const { data } = await axios.get("api/student/allStudent");
    console.log("All student api ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteStudent = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.delete(`api/student/delete/${id} `);
    console.log("Student  ==> ", data);
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
