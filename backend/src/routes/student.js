const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const authenticate = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");
const multer = require("multer");
const upload = multer();

const allowedRolesStudent = ["admin", "teacher", "student"];

// Create a new student with an image upload
router
  .route("/student")
  .post(upload.single("image"), studentController.createStudent);

// Student controller routes
router.route("/student/register").post(studentController.createStudent);
router.route("/student/all").get(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.getAllStudents
  );
router
  .route("/student/:id")
  .get(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.getStudentById
  )
  .put(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.updateStudent
  )
  .delete(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.deleteStudent
  );

router
  .route("/")
  .post(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.createStudent
  )
  .get(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.getAllStudents
  );

router
  .route("/:id")
  .get(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.getStudentById
  )
  .put(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.updateStudent
  )
  .delete(
    authenticate,
    authorize(allowedRolesStudent),
    studentController.deleteStudent
  );

module.exports = router;
