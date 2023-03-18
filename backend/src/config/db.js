const mongoose = require('mongoose');
const { dbUri } = require('./env'); // Import the dbUri variable from env.js

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
