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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
