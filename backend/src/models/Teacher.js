const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\+?\d{1,4}[-\s]?\(?\d{1,3}?\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/, 'Please enter a valid phone number']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Virtual property for the teacher's full name
TeacherSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Example method for the Teacher schema
TeacherSchema.methods.exampleMethod = function() {
    // Perform some operation on the teacher instance
};

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
