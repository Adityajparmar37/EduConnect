const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Teacher = require("../models/teacherModel.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const {
  generateToken,
} = require("../utils/generateToken");

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

//signUp API
router.post(
  "/signup",
  handler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        password,
        confirmPassword,
        semester,
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword ||
        !semester
      ) {
        next(
          errorHandler(
            401,
            "Please fill the fields"
          )
        );
      }

      const teacherExists = await Teacher.findOne(
        {
          email,
        }
      );
      if (teacherExists) {
        next(
          errorHandler(400, "User Already exist")
        );
      }

      const CreateTeacher = await Teacher.create({
        name,
        email,
        phone,
        password,
        semester,
      });

      if (CreateTeacher) {
        res.status(201).json({
          _id: CreateTeacher._id,
          name: CreateTeacher.name,
          email: CreateTeacher.email,
          userType: "student",
          token: generateToken(
            CreateTeacher._id,
            CreateTeacher.name,
            CreateTeacher.email
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(
            400,
            "Something Went Wrong"
          )
        );
      }
    } catch (error) {
      console.error("SignUp error", error);
      next(error);
    }
  })
);

module.exports = router;
