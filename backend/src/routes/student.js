const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const authenticate = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const multer = require("multer");
const upload = multer();

const readRoles = ["admin", "teacher", "staff"];
const writeRoles = ["admin", "teacher"];

// Create a new student with an image upload
router
  .route("/student")
  .post(
    authenticate,
    authorize(["admin", "teacher"]),
    upload.single("image"),
    studentController.createStudent
  );

// Student controller routes
router.route("/student/register").post(
  authenticate,
  authorize(["admin", "teacher"]),
  studentController.createStudent
);
router.route("/student/all").get(
    authenticate,
    authorize(readRoles),
    studentController.getAllStudents
  );
router
  .route("/student/:id")
  .get(
    authenticate,
    authorize(readRoles),
    studentController.getStudentById
  )
  .put(
    authenticate,
    authorize(writeRoles),
    studentController.updateStudent
  )
  .delete(
    authenticate,
    authorize(writeRoles),
    studentController.deleteStudent
  );

router
  .route("/")
  .post(
    authenticate,
    authorize(writeRoles),
    studentController.createStudent
  )
  .get(
    authenticate,
    authorize(readRoles),
    studentController.getAllStudents
  );

router
  .route("/:id")
  .get(
    authenticate,
    authorize(readRoles),
    studentController.getStudentById
  )
  .put(
    authenticate,
    authorize(writeRoles),
    studentController.updateStudent
  )
  .delete(
    authenticate,
    authorize(writeRoles),
    studentController.deleteStudent
  );

module.exports = router;
