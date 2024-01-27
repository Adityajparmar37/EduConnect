const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Admin = require("../models/adminModel.js");
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

      const FindAdmin = await Admin.findOne({
        email,
      });

      if (!FindAdmin)
        return next(
          errorHandler(404, "User not found")
        );

      if (
        FindAdmin &&
        (await FindAdmin.matchPassword(password))
      ) {
        res.json({
          _id: FindAdmin._id,
          name: FindAdmin.name,
          email: FindAdmin.email,
          userType: "Admin",
          token: generateToken(
            FindAdmin._id,
            FindAdmin.name,
            FindAdmin.email
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
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        next(
          errorHandler(
            401,
            "Please fill the fields"
          )
        );
      }

      const adminExists = await Admin.findOne({
        email,
      });
      if (adminExists) {
        next(
          errorHandler(400, "User Already exist")
        );
      }

      const CreateAdmin = await Admin.create({
        name,
        email,
        password,
      });

      if (CreateAdmin) {
        res.status(201).json({
          _id: CreateAdmin._id,
          name: CreateAdmin.name,
          email: CreateAdmin.email,
          userType: "Admin",
          token: generateToken(
            CreateAdmin._id,
            CreateAdmin.name,
            CreateAdmin.email,
            CreateAdmin.InsitutionName
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
