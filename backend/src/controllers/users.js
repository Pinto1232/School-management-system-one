const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const asyncHandler = require('../middlewares/asyncHandler');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.register = asyncHandler(upload.single('profileImage'), async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ email, password, firstName, lastName, role, image: profileImage });

    try {
        await user.save();
        console.log('Registered user:', user);
        // ... rest of your code
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                image: user.image
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already in use (from save)' });
        }
        throw error;

        if (error.errors && error.errors.image) {
            return res.status(400).json({ error: error.errors.image.message });
        }
    }

    /*  await user.save();
     console.log('Registered user:', user);
 
     res.status(201).json({
         message: 'User registered successfully',
         user: {
             id: user._id,
             email: user.email,
             firstName: user.firstName,
             lastName: user.lastName,
             role: user.role,
             image: user.image
         }
     }); */
});


exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

    res.status(200).json({
        token,
        message: 'User logged in successfully',
        user: {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            image: user.image
        }
    });
});
