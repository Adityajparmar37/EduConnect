const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const authMid = require("../middleware/authMiddleware.js");
const bcrypt = require("bcryptjs");
const {
  sendMail,
} = require("../utils/sendMail.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const {
  generateToken,
} = require("../utils/generateToken");
const Student = require("../models/studentModel.js");
const Semester = require("../models/semesterModel.js");
const StudentHist = require("../models/StudentHistoryModel.js");

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

      const FindStudent = await Student.findOne({
        email,
      });

      if (!FindStudent)
        return next(
          errorHandler(404, "User not found")
        );

      if (
        FindStudent &&
        (await FindStudent.matchPassword(
          password
        ))
      ) {
        res.json({
          _id: FindStudent._id,
          name: FindStudent.name,
          email: FindStudent.email,
          userType: "student",
          token: generateToken(
            FindStudent._id,
            FindStudent.name,
            FindStudent.email
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
  handler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        CurrentSemester,
      } = req.body;

      console.log(req.body);

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !CurrentSemester
      ) {
        return next(
          errorHandler(
            400,
            "Please fill all fields"
          )
        );
      }

      if (password !== confirmPassword) {
        return next(
          errorHandler(
            400,
            "Passwords do not match"
          )
        );
      }

      const studentExists = await Student.findOne(
        { email }
      );

      if (studentExists) {
        return next(
          errorHandler(409, "User already exists")
        );
      }

      const semId = await Semester.findOne({
        semesterNumber: CurrentSemester,
      });

      if (!semId) {
        return next(
          errorHandler(
            404,
            "Please select a proper semester"
          )
        );
      }

      const CreateStudent = await Student.create({
        name,
        email,
        password,
        CurrentSemester: semId._id,
      });

      const studentHist =
        await StudentHist.create({
          studentId: CreateStudent._id,
          semesterId: semId._id,
        });
      


      if (CreateStudent) {
        res.status(201).json({
          _id: CreateStudent._id,
          name: CreateStudent.name,
          email: CreateStudent.email,
          CurrentSemester:
            CreateStudent.CurrentSemester,
          userType: "student",
          token: generateToken(
            CreateStudent._id,
            CreateStudent.name,
            CreateStudent.email,
            CreateStudent.InstitutionName,
            CreateStudent.CurrentSemester
          ),
          success: true,
        });
      } else {
        return next(
          errorHandler(
            500,
            "Something went wrong"
          )
        );
      }
    } catch (error) {
      console.error("SignUp error", error);
      next(error);
    }
  })
);

//get all student
router.get(
  "/allstudent",
  authMid,
  handler(async (req, res, next) => {
    try {
      const allStudent = await Student.find({});

      if (allStudent) {
        console.log("Student ==> ", allStudent);
        res.send(allStudent);
      }
    } catch (error) {
      console.log("all student error", error);
      next(error);
    }
  })
);

//student nae delete karva
router.delete(
  "/delete/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const StudentToDelete =
        await Student.findByIdAndDelete(id);

      if (!StudentToDelete) {
        return next(
          errorHandler(404, "Student not found")
        );
      }

      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

///find individual student
router.get(
  "/manageStudent/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const studentData = await Student.findById(
        id
      );
      res.send(studentData);
    } catch (error) {
      next(
        errorHandler(404, "No Such Project Found")
      );
    }
  })
);

// Update student details by admin
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
        const existingStudent =
          await Student.findById(id);

        const updatedStudent =
          await Student.findByIdAndUpdate(
            id,
            updateFormData,
            { new: true }
          );

        if (!updatedStudent) {
          return res.status(404).json({
            success: false,
            error: "Teacher not found",
          });
        }

        // Check if the password is changed and send email
        if (
          existingStudent.password !==
          updatedStudent.password
        ) {
          const mailData = {
            name: updatedStudent.name,
            intro: "Your Updated Credentials",
            table: {
              data: [
                {
                  Email: updatedStudent.email,
                  Password: newPassword,
                },
              ],
            },
            outro: "Thank you 🫱🏻‍🫲🏾",
          };

          await sendMail(
            updatedStudent.email,
            "Student Credentials",
            mailData
          );
        }
      } else {
        const updatedStudent =
          await Student.findByIdAndUpdate(
            id,
            updateFormData,
            { new: true }
          );

        if (!updatedStudent) {
          return res.status(404).json({
            success: false,
            error: "Student not found",
          });
        }
      }

      res.json({
        success: true,
        message: "Student updated successfully",
      });
    } catch (error) {
      console.error(
        "Error updating Student",
        error
      );

      next(error);
    }
  })
);
module.exports = router;
