import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";

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

  // Function to handle adding a new subject field
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

  const handleSubmit = () => {
    console.log("Form data:", teacherData);
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 mt-5 flex h-auto w-5/6 px-3 pt-10">
        <div className="w-full">
          <section className="bg-blueGray-50 w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-0 rounded-t bg-gray-50 px-6 py-6">
                  <div className="flex justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Create Teacher
                    </h6>
                    <button
                      onClick={handleSubmit}
                      className="mr-1 rounded bg-red-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red-600"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    <h6 className="text-blueGray-400 mb-6 mt-3 text-sm font-bold uppercase">
                      Teacher Information
                    </h6>
                    <div className="flex flex-wrap items-center">
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor="grid-password"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            value={teacherData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor="grid-password"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={teacherData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor="grid-password"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            value={teacherData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-6/12">
                        <div className="relative mb-3 w-full">
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
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                            maxLength={14}
                            pattern="\+91[0-9]{10}"
                            placeholder="+91XXXXXXXXXX"
                            title="Please enter a valid Indian phone number starting with +91"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 mt-6" />

                    <h6 className="text-blueGray-400 mb-6 mt-3 text-sm font-bold uppercase">
                      credentials
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full px-4 lg:w-4/12">
                        <div className="relative mb-3 w-full">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            value={teacherData.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-4/12">
                        <div className="relative mb-3 w-full">
                          <label
                            className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            value={teacherData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value,
                              )
                            }
                            className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 mt-6" />

                    <h6 className="text-blueGray-400 mb-6 mt-3 text-sm font-bold uppercase">
                      Subject Information
                    </h6>

                    {teacherData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap justify-between"
                      >
                        {/* Subject Name */}
                        <div className="w-full px-4 lg:w-4/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                              htmlFor={`subjectName-${index}`}
                            >
                              Subject Name
                            </label>
                            <input
                              type="text"
                              id={`subjectName-${index}`}
                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
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
                        </div>

                        {/* Subject Number */}
                        <div className="w-full px-4 lg:w-4/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                              htmlFor={`subjectNumber-${index}`}
                            >
                              Subject Number
                            </label>
                            <input
                              type="text"
                              id={`subjectNumber-${index}`}
                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
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
                        </div>

                        {/* Semester */}
                        <div className="w-full px-4 lg:w-4/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                              htmlFor={`semester-${index}`}
                            >
                              Semester
                            </label>
                            <input
                              type="text"
                              id={`semester-${index}`}
                              className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                              value={subject.semester}
                              onChange={(e) =>
                                handleSubjectChange(
                                  index,
                                  "semester",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Subject Button */}
                    <div className="w-full px-4 lg:w-4/12">
                      <div className="relative top-8 mb-3 w-full">
                        <button
                          onClick={handleAddSubject}
                          className="mr-1 rounded bg-red-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red-600"
                          type="button"
                        >
                          ADD
                        </button>
                      </div>
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
