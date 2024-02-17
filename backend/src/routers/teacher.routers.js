const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const errorHandler = require("../middleware/errorMiddleware.js");
const Teacher = require("../models/teacherModel.js");
const authMid = require("../middleware/authMiddleware.js");
const Semester = require("../models/semesterModel.js");
const {
  sendMail,
} = require("../utils/sendMail.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const {
  generateToken,
} = require("../utils/generateToken");
const Subject = require("../models/subjectModel.js");
const AssignSubject = require("../models/assignSubject.js");

//admin login
router.post(
  "/login",
  handler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(
          errorHandler(
            401,
            "Please fill all fields"
          )
        );
      }

      const FindTeacher = await Teacher.findOne({
        email,
      });

      if (!FindTeacher)
        return next(
          errorHandler(404, "User not found")
        );

      if (
        FindTeacher &&
        (await FindTeacher.matchPassword(
          password
        ))
      ) {
        res.json({
          _id: FindTeacher._id,
          name: FindTeacher.name,
          email: FindTeacher.email,
          userType: "teacher",
          token: generateToken(
            FindTeacher._id,
            FindTeacher.name,
            FindTeacher.email
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(401, "Wrong Credentials")
        );
      }
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  "/signup",
  authMid,
  handler(async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        subjects,
        semesters,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !subjects ||
        !semesters
      ) {
        return next(
          errorHandler(
            401,
            "Please fill all the required fields"
          )
        );
      }

      const teacherExists = await Teacher.findOne(
        { email }
      );

      if (teacherExists) {
        return next(
          errorHandler(400, "User Already Exists")
        );
      }

      const createTeacher = await Teacher.create({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      let subjectAssigned = false;

      for (const subject of subjects) {
        if (subjectAssigned) break; // If subject already assigned, break the loop

        for (const semester of semesters) {
          console.log(
            `Subject:`,
            JSON.stringify(subject)
          );

          try {
            const findSubjectList =
              await Semester.findOne({
                semesterNumber: semester,
              });

            console.log(
              "Found Semester:",
              findSubjectList
            );

            try {
              const subjectDetails =
                await Subject.findById(
                  subject._id
                );
              console.log(
                "Subject Details:",
                subjectDetails
              );

              const assignSubject =
                await AssignSubject.create({
                  subjectId: subject._id,
                  semesterId: findSubjectList._id,
                  teacherId: createTeacher._id,
                });
              console.log(
                `Assigned subject ${subject._id} to semester ${semester}:`,
                assignSubject
              );
            } catch (error) {
              console.error(
                "Error fetching subject details:",
                error
              );
            }
          } catch (error) {
            console.error(
              "Error finding semester:",
              error
            );
          }
        }

        subjectAssigned = true; // Set the flag to true after assigning the subject
      }

      if (createTeacher) {
        const mailData = {
          name: createTeacher.name,
          intro:
            "Your Credentials to login in platform",
          table: {
            data: [
              {
                Email: createTeacher.email,
                Password: password,
              },
            ],
          },
          outro: "Thank you 🫱🏻‍🫲🏾",
        };

        await sendMail(
          createTeacher.email,
          "Teacher Credentials",
          mailData
        );

        return res.status(201).json({
          _id: createTeacher._id,
          name: createTeacher.name,
          email: createTeacher.email,
          userType: "teacher",
          token: generateToken(
            createTeacher._id,
            createTeacher.name,
            createTeacher.email
          ),
          mail: "Email sent successfully",
          success: true,
        });
      } else {
        return next(
          errorHandler(
            400,
            "Something Went Wrong"
          )
        );
      }
    } catch (error) {
      console.log("SignUp error", error);
      return next(error);
    }
  })
);

router.get(
  "/getAllTeacher",
  authMid,
  handler(async (req, res, next) => {
    try {
      const getAllTeacher = await Teacher.find(
        {}
      );

      if (getAllTeacher) {
        res.status(201).json(getAllTeacher);
      } else {
        next(
          errorHandler(404, "No teacher found !")
        );
      }
    } catch (error) {
      next(error);
      console.log("All teacher fetching error");
    }
  })
);

router.delete(
  "/delete/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const teacherToDelete =
        await Teacher.findByIdAndDelete(id);

      if (!teacherToDelete) {
        return next(
          errorHandler(404, "Teacher not found")
        );
      }

      res.status(200).json({
        success: true,
        message: "Teacher deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

///find individual teacher
router.get(
  "/manageTeacher/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const teacherData = await Teacher.findById(
        id
      );
      res.send(teacherData);
    } catch (error) {
      next(
        errorHandler(404, "No Such Project Found")
      );
    }
  })
);

//upadte teacher detials by admin
// Update teacher details by admin
router.put(
  "/update/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateFormData = req.body;
      const newPassword = updateFormData.password;
      console.log(newPassword);
      // console.log(updateFormData);
      console.log(id);

      if (updateFormData.password) {
        const salt = await bcrypt.genSalt(10);
        updateFormData.password =
          await bcrypt.hash(
            updateFormData.password,
            salt
          );

        // Fetch the existing teacher data before the update
        const existingTeacher =
          await Teacher.findById(id);

        const updatedTeacher =
          await Teacher.findByIdAndUpdate(
            id,
            updateFormData,
            { new: true }
          );

        if (!updatedTeacher) {
          return res.status(404).json({
            success: false,
            error: "Teacher not found",
          });
        }

        // Check if the password is changed and send email
        if (
          existingTeacher.password !==
          updatedTeacher.password
        ) {
          const mailData = {
            name: updatedTeacher.name,
            intro: "Your Updated Credentials",
            table: {
              data: [
                {
                  Email: updatedTeacher.email,
                  Password: newPassword,
                },
              ],
            },
            outro: "Thank you 🫱🏻‍🫲🏾",
          };

          await sendMail(
            updatedTeacher.email,
            "Teacher Credentials",
            mailData
          );
        }
      } else {
        const updatedTeacher =
          await Teacher.findByIdAndUpdate(
            id,
            updateFormData,
            { new: true }
          );

        if (!updatedTeacher) {
          return res.status(404).json({
            success: false,
            error: "Teacher not found",
          });
        }
      }

      res.json({
        success: true,
        message: "Teacher updated successfully",
      });
    } catch (error) {
      console.error(
        "Error updating Teacher",
        error
      );

      next(error);
    }
  })
);

module.exports = router;
