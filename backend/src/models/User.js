const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  accountStatus: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

const createUser = async (userID, username, email, password, firstName, lastName, dateOfBirth, address, phoneNumber, role, accountStatus) => {
  const user = new User({
    userID,
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    address,
    phoneNumber,
    role,
    accountStatus
  });

  try {
    const result = await user.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createUser;
