const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
  image: {
    data: Buffer,
    contentType: String,
    url: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
