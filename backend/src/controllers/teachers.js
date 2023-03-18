const Teacher = require('../models/Teacher');

const validateTeacherData = (firstName, lastName, email, subject, address, phoneNumber, hireDate) => {
    const errors = [];
    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    if (!email) errors.push('Email is required');
    if (!subject) errors.push('Subject is required');
    if (!address) errors.push('Address is required');
    if (!phoneNumber) errors.push('Phone number is required');
    if (!hireDate) errors.push('Hire date is required');

    return errors;
};

const createTeacher = async (req, res, next) => {
    try {
        const { firstName, lastName, email, subject, address, phoneNumber, hireDate } = req.body;

        const errors = validateTeacherData(firstName, lastName, email, subject, address, phoneNumber, hireDate);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newTeacher = new Teacher({ firstName, lastName, email, subject, address, phoneNumber, hireDate });
        await newTeacher.save();

        res.status(201).json({ message: 'Teacher created', teacher: newTeacher });
    } catch (error) {
        next(error);
    }
};

const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ message: 'Teachers fetched', teachers });
    } catch (error) {
        next(error);
    }
};

const getTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher fetched', teacher });
    } catch (error) {
        next(error);
    }
};

const updateTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, subject, address, phoneNumber, hireDate } = req.body;

        const errors = validateTeacherData(firstName, lastName, email, subject, address, phoneNumber, hireDate);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { firstName, lastName, email, subject, address, phoneNumber, hireDate },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Teacher updated', teacher: updatedTeacher });
    } catch (error) {
        next(error);
    }
};

const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Teacher.findByIdAndDelete(id);

        res.status(200).json({ message: 'Teacher deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
