import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../../Components/SideNav/SideNav";
import {
  getAllTeacher,
  getTeacherSubjects,
} from "../../../Services/teacherServices";
import toast from "react-hot-toast";
import { createTimeTable } from "../../../Services/adminServices";

const CreateTimetable = () => {
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: "",
    subjects: [
      {
        subjectId: "",
        type: "Theory",
        startTime: { hour: "", minute: "", period: "AM" },
        endTime: { hour: "", minute: "", period: "AM" },
        classroom: "",
        batch: 0,
        days: [], // Added an array to store selected days
      },
    ],
  });

  useEffect(() => {
    const fetchAllTeacher = async () => {
      try {
        const responseTeacher = await getAllTeacher();
        setTeacherOptions(responseTeacher);
      } catch (error) {
        toast.error("Please try again");
        console.log(error);
      }
    };

    fetchAllTeacher();
  }, []);

  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      try {
        const response = await getTeacherSubjects(formData.teacherId);
        const subjectOptions = response.map((item) => ({
          _id: item.subjectId._id,
          subjectName: item.subjectId.subjectName,
          subjectNumber: item.subjectId.subjectNumber,
        }));
        setSubjectOptions(subjectOptions);
      } catch (error) {
        toast.error("Error fetching teacher subjects. Please try again.");
        console.error("Error fetching teacher subjects:", error);
      }
    };

    if (formData.teacherId) {
      fetchTeacherSubjects();
    }
  }, [formData.teacherId]);

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleTypeChange = (e, index) => {
    const { value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index]["type"] = value;
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleHourChange = (e, index, type) => {
    const { value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][type] = {
      ...newSubjects[index][type],
      hour: value,
    };
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleMinuteChange = (e, index, type) => {
    const { value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][type] = {
      ...newSubjects[index][type],
      minute: value,
    };
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handlePeriodChange = (e, index, type) => {
    const { value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][type] = {
      ...newSubjects[index][type],
      period: value,
    };
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleDayChange = (day, index) => {
    const newSubjects = [...formData.subjects];
    const dayIndex = newSubjects[index].days.indexOf(day);
    if (dayIndex === -1) {
      newSubjects[index].days.push(day);
    } else {
      newSubjects[index].days.splice(dayIndex, 1);
    }
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        {
          subjectId: "",
          type: "Theory",
          startTime: { hour: "", minute: "", period: "AM" },
          endTime: { hour: "", minute: "", period: "AM" },
          classroom: "",
          batch: 0,
          days: [],
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await createTimeTable(formData);
      console.log(response);
      toast.success("Time Table Created");
    } catch (error) {
      toast.error("Please try again !");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:w-1/6">
        <SideNav />
      </div>
      <div className="z-10 mt-5 flex w-full flex-col overflow-auto px-3 pt-10 lg:w-5/6 lg:flex-row">
        <div className="mx-auto w-full lg:w-3/4 xl:w-full">
          <section className="w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-5 rounded-t border-b-2 border-gray-500 bg-gray-50 px-5 py-3 md:mb-6">
                  <div className="flex items-center justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      📅 Create Timetable
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
                          htmlFor="teacherId"
                        >
                          Teacher
                        </label>
                        <select
                          id="teacherId"
                          name="teacherId"
                          value={formData.teacherId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              teacherId: e.target.value,
                            })
                          }
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        >
                          <option value="">Select Teacher</option>
                          {teacherOptions.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                              {teacher.firstName + " " + teacher.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Subject Information */}
                    <div className="border-t text-center">
                      <h1 className="text-dark mb-6 mt-3 font-bold uppercase">
                        Select Subjects
                      </h1>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {formData.subjects.map((subject, index) => (
                        <div key={index}>
                          <div className="mb-4">
                            <label
                              htmlFor={`subject${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              Subject
                            </label>
                            <select
                              id={`subject${index}`}
                              name="subjectId"
                              value={subject.subjectId}
                              onChange={(e) => handleSubjectChange(e, index)}
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                            >
                              <option value="">Select Subject</option>
                              {subjectOptions.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                  {subject.subjectName +
                                    " " +
                                    subject.subjectNumber}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-4">
                            <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                              Days
                            </label>
                            <div className="flex gap-4">
                              {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                              ].map((day) => (
                                <label
                                  key={day}
                                  className="inline-flex items-center"
                                >
                                  <input
                                    type="checkbox"
                                    value={day}
                                    checked={subject.days.includes(day)}
                                    onChange={() => handleDayChange(day, index)}
                                    className="mr-2"
                                  />
                                  <span
                                    className={`text-sm font-medium ${subject.days.includes(day) ? "text-blue-600" : "text-gray-600"}`}
                                  >
                                    {day}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-12">
                            <div className="mb-4">
                              <label
                                htmlFor={`type${index}`}
                                className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                              >
                                Type
                              </label>
                              <div className="flex flex-col">
                                <label className="mr-4 inline-flex items-center">
                                  <input
                                    type="radio"
                                    name={`type${index}`}
                                    value="Theory"
                                    checked={subject.type === "Theory"}
                                    onChange={(e) => handleTypeChange(e, index)}
                                    className="mr-2"
                                  />
                                  Theory
                                </label>
                                <label className="inline-flex items-center">
                                  <input
                                    type="radio"
                                    name={`type${index}`}
                                    value="Practical"
                                    checked={subject.type === "Practical"}
                                    onChange={(e) => handleTypeChange(e, index)}
                                    className="mr-2"
                                  />
                                  Practical
                                </label>
                              </div>
                            </div>
                            {subject.type === "Practical" && (
                              <div className="mb-4 w-full">
                                <label
                                  htmlFor={`batch${index}`}
                                  className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                                >
                                  Batch
                                </label>
                                <select
                                  id={`batch${index}`}
                                  name="batch"
                                  value={subject.batch}
                                  onChange={(e) =>
                                    handleSubjectChange(e, index)
                                  }
                                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                                >
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                  <option value="E">E</option>
                                </select>
                              </div>
                            )}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`startTime${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              Start Time
                            </label>
                            <div className="flex items-center space-x-2">
                              <select
                                value={subject.startTime.hour}
                                onChange={(e) =>
                                  handleHourChange(e, index, "startTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="">Hour</option>
                                {[...Array(12)].map((_, index) => (
                                  <option
                                    key={index + 1}
                                    value={(index + 1)
                                      .toString()
                                      .padStart(2, "0")}
                                  >
                                    {(index + 1).toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                              <span className="text-gray-500">:</span>
                              <select
                                value={subject.startTime.minute}
                                onChange={(e) =>
                                  handleMinuteChange(e, index, "startTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="">Minute</option>
                                {[...Array(60)].map((_, index) => (
                                  <option
                                    key={index}
                                    value={index.toString().padStart(2, "0")}
                                  >
                                    {index.toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={subject.startTime.period}
                                onChange={(e) =>
                                  handlePeriodChange(e, index, "startTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`endTime${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              End Time
                            </label>
                            <div className="flex items-center space-x-2">
                              <select
                                value={subject.endTime.hour}
                                onChange={(e) =>
                                  handleHourChange(e, index, "endTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="">Hour</option>
                                {[...Array(12)].map((_, index) => (
                                  <option
                                    key={index + 1}
                                    value={(index + 1)
                                      .toString()
                                      .padStart(2, "0")}
                                  >
                                    {(index + 1).toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                              <span className="text-gray-500">:</span>
                              <select
                                value={subject.endTime.minute}
                                onChange={(e) =>
                                  handleMinuteChange(e, index, "endTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="">Minute</option>
                                {[...Array(60)].map((_, index) => (
                                  <option
                                    key={index}
                                    value={index.toString().padStart(2, "0")}
                                  >
                                    {index.toString().padStart(2, "0")}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={subject.endTime.period}
                                onChange={(e) =>
                                  handlePeriodChange(e, index, "endTime")
                                }
                                className="rounded border border-gray-300 px-2 py-1"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`classroom${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              Classroom
                            </label>
                            <input
                              type="text"
                              id={`classroom${index}`}
                              name="classroom"
                              value={subject.classroom}
                              onChange={(e) => handleSubjectChange(e, index)}
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Add Subject Button */}
                    <div className="mb-4">
                      <button
                        onClick={handleAddSubject}
                        className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all  duration-200 ease-linear hover:rounded-full hover:bg-mintPrimary  hover:text-black hover:shadow-md focus:outline-none active:bg-red-600"
                        type="button"
                      >
                        Add Subject
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
};

export default CreateTimetable;