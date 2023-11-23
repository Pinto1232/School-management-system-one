const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator');
const { hashPassword } = require("../utils/password");
const fs = require('fs');
const path = require('path');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    /* image: {
      type: String,
    }, */
    image: {
      type: String,
      required: [true, 'A profile image is required'],
      validate: {
        validator: function (value) {
          // Check if the file exists in the given path
          const filePath = path.join(__dirname, '..', value);
          return fs.existsSync(filePath);
        },
        message: props => `File does not exist: ${props.value}`
      }
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await hashPassword(this.password);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
