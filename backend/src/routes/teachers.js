const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');
const teacherController = require('../controllers/teachers');

const allowedRolesTeacher = ['teacher', 'admin'];

/**
 * @swagger
 * /teachers/register:
 *   post:
 *     summary: Register a new teacher
 *     description: Only admins can register a new teacher.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 */
router.route('/register').post(teacherController.createTeacher);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Only accessible by teachers and admins.
 *     responses:
 *       200:
 *         description: A list of teachers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.route('/')
  .get(authenticate, authorize(allowedRolesTeacher), teacherController.getAllTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     description: Only accessible by teachers and admins.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *   put:
 *     summary: Update a teacher's information
 *     description: Only accessible by teachers and admins.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *   delete:
 *     summary: Delete a teacher
 *     description: Only accessible by admins.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Teacher deleted successfully
 */
router.route('/:id')
  .get(authenticate, authorize(allowedRolesTeacher), teacherController.getTeacherById)
  .put(authenticate, authorize(allowedRolesTeacher), teacherController.updateTeacher)
  .delete(authenticate, authorize(allowedRolesTeacher), teacherController.deleteTeacher);

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the teacher
 *         name:
 *           type: string
 *           description: The name of the teacher
 *         email:
 *           type: string
 *           description: The email of the teacher
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: johndoe@example.com
 */

module.exports = router;