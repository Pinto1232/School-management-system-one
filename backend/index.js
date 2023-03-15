const express = require('express');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const { dbUri, port } = require('./src/config/env');

// Import user routes
const userRoutes = require('./src/routes/users');

const app = express();

// Connect to MongoDB
connectDB();


// Middlewares
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
