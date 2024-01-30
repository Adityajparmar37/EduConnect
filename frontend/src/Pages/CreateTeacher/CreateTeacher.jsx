import React, { useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../../Services/teacherServices";
import SideNav from "../../Components/SideNav/SideNav";

export default function CreateTeacher() {
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subjects: [{ subjectName: "", subjectNumber: "", semester: "" }],
  });

  const handleAddSubject = () => {
    setTeacherData((prevData) => ({
      ...prevData,
      subjects: [
        ...prevData.subjects,
        { subjectName: "", subjectNumber: "", semester: "" },
      ],
    }));
  };

  const handleSubjectChange = (index, key, value) => {
    setTeacherData((prevData) => {
      const updatedSubjects = [...prevData.subjects];
      updatedSubjects[index][key] = value;
      return { ...prevData, subjects: updatedSubjects };
    });
  };

  const handleInputChange = (key, value) => {
    setTeacherData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", teacherData);
    try {
      if (teacherData.password !== teacherData.confirmPassword) {
        toast.error("Password must match");
      } else {
        const responseTeacher = await signup(teacherData);
        console.log(responseTeacher);

        if (responseTeacher.success === true) {
          toast.success("Teacher added successfully");
        } else {
          toast.error(responseTeacher.message);
        }
      }
    } catch (error) {
      toast.error("Please try again");
      console.log("Teacher create error frontend", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:w-1/6">
        <SideNav />
      </div>
      <div className="z-10 mt-5 flex w-full flex-col overflow-auto px-3 pt-10 lg:w-5/6  lg:flex-row">
        <div className="mx-auto w-full lg:w-3/4 xl:w-full">
          <section className="w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-5 rounded-t border-b-2 border-gray-500 bg-gray-50 px-5 py-3 md:mb-6">
                  <div className="flex items-center justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Create Teacher
                    </h6>
                    <button
                      onClick={handleSubmit}
                      className="text-md rounded bg-primary px-4 py-2 font-bold uppercase text-white shadow outline-none transition-all  duration-200 ease-linear hover:rounded-full hover:bg-mintPrimary hover:text-black hover:shadow-md focus:outline-none active:bg-red-600"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    {/* Teacher Information */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={teacherData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Enter Teacher's First Name"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={teacherData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Enter Teacher's Last Name"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="email"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={teacherData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="teacher@gmail.com"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="phone-number"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone-number"
                          value={teacherData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                          maxLength={10}
                          pattern="\+91[0-9]{10}"
                          placeholder="Enter 10 Digit Phone number"
                          title="Please enter a valid Indian phone number starting with +91"
                          required
                        />
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 my-6" />

                    {/* Credentials */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={teacherData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="Enter any password"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={teacherData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          placeholder="Password must match"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 my-6" />

                    {/* Subject Information */}
                    <h6 className="text-blueGray-400 mb-6 mt-3 text-sm font-bold uppercase">
                      Subject Information
                    </h6>
                    {teacherData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
                      >
                        {/* Subject Name */}
                        <div className="mb-4">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor={`subjectName-${index}`}
                          >
                            Subject Name
                          </label>
                          <input
                            type="text"
                            id={`subjectName-${index}`}
                            placeholder="Choose Subject Name"
                            className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                            value={subject.subjectName}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                "subjectName",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Subject Number */}
                        <div className="mb-4">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor={`subjectNumber-${index}`}
                          >
                            Subject Number
                          </label>
                          <input
                            type="text"
                            id={`subjectNumber-${index}`}
                            placeholder="Choose Subject Number"
                            className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                            value={subject.subjectNumber}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                "subjectNumber",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Semester */}
                        <div className="mb-4">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor={`semester-${index}`}
                          >
                            Semester
                          </label>
                          <select
                            id={`semester-${index}`}
                            className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                            value={subject.semester}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                "semester",
                                e.target.value,
                              )
                            }
                          >
                            <option value="" disabled>
                              Choose Semester
                            </option>
                            {[1, 2, 3, 4, 5, 6].map((semester) => (
                              <option key={semester} value={semester}>
                                Semester {semester}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {/* Add Subject Button */}
                    <div className="mb-4">
                      <button
                        onClick={handleAddSubject}
                        className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all  duration-200 ease-linear hover:rounded-full hover:bg-mintPrimary  hover:text-black hover:shadow-md focus:outline-none active:bg-red-600"
                        type="button"
                      >
                        ADD
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
