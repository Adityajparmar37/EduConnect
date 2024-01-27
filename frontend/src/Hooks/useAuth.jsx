import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as adminServices from "../Services/adminServices.js";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(adminServices.getUser());

  //login
  const login = async (loginData) => {
    try {
      if (loginData.userType === "admin") {
        const user = await adminServices.login(loginData);
        console.log(user);
        if (user.success === true) {
          setUser(user);
          localStorage.setItem("UserInfo", JSON.stringify(user));
          toast.success("Successfully Login !");
          navigate("/admin");
        } else {
          if (user.success === false) {
            toast.error(user.message);
          }
        }
      } else {
        toast.error("You are not a correct user type");
      }
    } catch (error) {
      toast.error("Some Error Occured !");
      console.error("ERROR OCCURED SIGNUP !", error);
    }
  };

  const signup = async (signupData) => {
    try {
      if (signupData.userType === "admin") {
        console.log(signupData);
        const user = await adminServices.signup(signupData);
        console.log("user ==>> ", user);
        if (user.success === true) {
          setUser(user);
          localStorage.setItem("UserInfo", JSON.stringify(user));
          toast.success("Successfully");
          navigate("/admin");
        } else {
          if (user.success === false) {
            toast.error(user.message);
          }
        }
      } else {
        toast.error("You are not a correct user type");
      }
    } catch (error) {
      toast.error("Some Error Occured !");
      console.log("ERROR OCCURED !", error);
    }
  };

  const logout = () => {
    adminServices.logout();
    setUser(null);
    navigate("/");
    toast.success("Logout Successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
