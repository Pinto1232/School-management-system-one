const express = require('express');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const { port } = require('./src/config/env');
const attendanceRoutes = require('./src/routes/attendance');

// Import user routes
const userRoutes = require('./src/routes/users');
const studentRoutes = require('./src/routes/student');


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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
