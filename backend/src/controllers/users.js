const { User } = require('../models');
const { userRoles } = require('../models/User');



// @desc    Create new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user with same email already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user
        user = new User({ name, email, password, role });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Generate token
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


// Get all users
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Get a user by ID
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// Create a new user
/* const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const newUser = new User({ firstName, lastName, email, password, role });
  await newUser.save();
  res.json(newUser);
}; */

// Update a user by ID
const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.role = req.body.role || user.role;
  await user.save();
  res.json(user);
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
};

// Example of restricting an endpoint based on user role
const exampleRestrictedEndpoint = (req, res) => {
  if (req.user.role !== userRoles.ACCOUNTANT) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Endpoint logic for accountants only
  res.json({ message: 'This endpoint can only be accessed by accountants' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  exampleRestrictedEndpoint,
  createUser
};


