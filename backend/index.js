const { port } = require('./src/config/env');
const express = require('express');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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
const libraryRoutes = require('./src/routes/library');
const bookRoutes = require('./src/routes/book');
const sportRoutes = require('./src/routes/sports');
const studentTrackingRoutes = require('./src/routes/studenttracking');
const subscriptionRoutes = require('./src/routes/subscription');
const resetPasswordRoutes = require('./src/routes/resetPasswordRoutes')
const packagesRoutes = require('./src/routes/packages')
const iconsRoutes = require('./src/routes/icons');
/* const userRoutes = require('./routes/userRoutes'); */

const app = express();

// Connect to MongoDB
connectDB();


// Middlewares
app.use(express.json()); // Parse JSON request body
app.use(cors());

// Use user routes
app.use('/api/users', userRoutes);

app.use('/api', userRoutes);


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

// Use payments routes
app.use('/api/libraries', libraryRoutes)

// Use book routes
app.use('/api/books', bookRoutes)

// Use sport routes
app.use('/api/sports', sportRoutes)

// Use studentTracking routes
app.use('/api', studentTrackingRoutes)

// Use subscription routes
app.use('/api/subscriptions', subscriptionRoutes);

// Use resetPassword routes
app.use('/api/request-password-reset', resetPasswordRoutes);
app.use('/api/reset-password', resetPasswordRoutes);

// Use packages routes
app.use('/api/packages', packagesRoutes);

// Use Icons routes
app.use('/api/icons', iconsRoutes)
/* 
app.use('/uploads', express.static('uploads'));
 */

app.use('/api/users/uploads', express.static('uploads'));

console.log(path.join(__dirname, 'uploads'));



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
