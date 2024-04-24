import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../../Components/SideNav/SideNav";

const CreateTimetable = () => {
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: "",
    subjects: [
      {
        subject: "",
        type: "Theory",
        time: "",
        classroom: "",
      },
    ],
  });

  useEffect(() => {
    // Fetch teacher options
    axios
      .get("/teachers")
      .then((response) => {
        setTeacherOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });

    // Fetch subject options
    axios
      .get("/subjects")
      .then((response) => {
        setSubjectOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
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
          subject: "",
          type: "Theory",
          time: "",
          classroom: "",
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend API to create timetable entries
    axios
      .post("/timetable", formData)
      .then((response) => {
        console.log("Timetable entries created:", response.data);
        // Reset form fields after successful submission
        setFormData({
          teacherId: "",
          subjects: [
            {
              subject: "",
              type: "Theory",
              time: "",
              classroom: "",
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error creating timetable entries:", error);
      });
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
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Subject Information */}
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
                              name="subject"
                              value={subject.subject}
                              onChange={(e) => handleChange(e, index)}
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                            >
                              <option value="">Select Subject</option>
                              {subjectOptions.map((subject) => (
                                <option key={subject} value={subject}>
                                  {subject}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`type${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              Type
                            </label>
                            <div>
                              <label className="mr-4 inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`type${index}`}
                                  value="Theory"
                                  checked={subject.type === "Theory"}
                                  onChange={(e) => handleChange(e, index)}
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
                                  onChange={(e) => handleChange(e, index)}
                                  className="mr-2"
                                />
                                Practical
                              </label>
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`time${index}`}
                              className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                            >
                              Time
                            </label>
                            <select
                              id={`time${index}`}
                              name="time"
                              value={subject.time}
                              onChange={(e) => handleChange(e, index)}
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                            >
                              <option value="">Select Time</option>
                              {/* Add options for time */}
                            </select>
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
                              onChange={(e) => handleChange(e, index)}
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
