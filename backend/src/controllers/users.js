const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// Ensure the uploads directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../src/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
const saltRounds = 10;

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "Profile image upload failed" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: req.file.path,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.login = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Update last login date
  user.lastLogin = new Date();
  await user.save();

  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

  res.status(200).json({
    token,
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      image: user.image,
    },
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const query = {};
    if (req.query.firstName) {
      query.firstName = { $regex: new RegExp(req.query.firstName, "i") };
    }
    if (req.query.lastName) {
      query.lastName = { $regex: new RegExp(req.query.lastName, "i") };
    }
    if (req.query.email) {
      query.email = req.query.email;
    }

    // Assuming pagination
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;

    const users = await User.find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .select("-password -sensitiveData");

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / pageSize),
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    message: "User deleted successfully",
    user,
  });
});
