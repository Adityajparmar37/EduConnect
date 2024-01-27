const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Student = require("../models/studentModel.js");
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

//signUp API
router.post(
  "/signup",
  handler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        semester,
      } = req.body;

      if (
        !name ||
        !email ||
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

      const studentExists = await Student.findOne(
        {
          email,
        }
      );
      if (studentExists) {
        next(
          errorHandler(400, "User Already exist")
        );
      }

      const CreateStudent = await Student.create({
        name,
        email,
        password,
        semester,
      });

      if (CreateStudent) {
        res.status(201).json({
          _id: CreateStudent._id,
          name: CreateStudent.name,
          email: CreateStudent.email,
          userType: "student",
          token: generateToken(
            CreateStudent._id,
            CreateStudent.name,
            CreateStudent.email,
            CreateStudent.InsitutionName
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
