const express = require('express');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const { port } = require('./src/config/env');

// Import user routes
const attendanceRoutes = require('./src/routes/attendance');
const userRoutes = require('./src/routes/users');
const studentRoutes = require('./src/routes/student');
const teacherRoutes = require('./src/routes/teachers');
const adminRoutes = require('./src/routes/admin');
const courseRoutes = require('./src/routes/course');
const classroomRoutes = require('./src/routes/classroom');
const campusSafetyRoutes = require('./src/routes/campussafety');
const enrollmentRoutes = require('./src/routes/enrollment');
const eventRoutes = require('./src/routes/event')
const financeRoutes = require('./src/routes/financial')
const gradebookRoutes = require('./src/routes/gradebook');
const humanresourceRoutes = require('./src/routes/humanresource');
const facultyRoutes = require('./src/routes/faculty');
const paymentRoutes = require('./src/routes/payment');


const app = express();

// Connect to MongoDB
connectDB();


// Middlewares
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS

// Use user routes
app.use('/api/users', userRoutes);

// attendances routes
app.use('/api/attendances', attendanceRoutes);

// Use student routes
app.use('/api/students', studentRoutes);

// Use teacher routes
app.use('/api/teachers', teacherRoutes);

// Use admin  routes
app.use('/api/admins', adminRoutes);

// Use course routes
app.use('/api/courses', courseRoutes);

// Use classroom routes
app.use('/api/classrooms', classroomRoutes)

// Use campusSafety routes
app.use('/api/campusSafety', campusSafetyRoutes)

// Use enrollment routes
app.use('/api/enrollments', enrollmentRoutes)

// Use event routes
app.use('/api/events', eventRoutes)

// Use finance routes
app.use('/api/finances', financeRoutes)

// Use gradebook routes
app.use('/api/gradebook', gradebookRoutes);

// Use humanresource routes
app.use('/api/humanresources', humanresourceRoutes)

// Use faculties routes
app.use('/api/faculties', facultyRoutes);

// Use payments routes
app.use('/api/payments', paymentRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
