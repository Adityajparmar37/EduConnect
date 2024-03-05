const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
dotenv.config();

router.use(authMid);

router.get(
  "/markAttendance",
  handler(async (req, res, next) => {
    try {
      const { attendanceData } = req.query;
      console.log(req.query);
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);

module.exports = router;
