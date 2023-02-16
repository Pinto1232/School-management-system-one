const mongoose = require('mongoose');


// define roles for User model
const userRoles = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STAFF: 'staff',
  LIBRARIAN: 'librarian',
  ACCOUNTANT: 'accountant',
  TRANSPORT_MANAGER: 'transport manager',
  MAINTENANCE: 'maintenance',
  FOOD_SERVICE: 'food service',
  HEALTH: 'health',
  ONLINE_LEARNING: 'online learning',
  SPORT: 'sport',
  STUDENT_TRACKING: 'student tracking',
  PARENT_COMMUNICATION: 'parent communication'
};
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
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.STUDENT
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
