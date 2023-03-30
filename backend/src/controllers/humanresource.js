const HumanResource = require('../models/HumanResource');

// Helper function to handle validation and error messages
const validateHumanResourceData = (fullName, position, hireDate, department, email, phoneNumber, address, salary) => {
    const errors = [];
    if (!fullName) errors.push('Full name is required');
    if (!position) errors.push('Position is required');
    if (!hireDate) errors.push('Hire date is required');
    if (!department) errors.push('Department is required');
    if (!email) errors.push('Email is required');
    if (!phoneNumber) errors.push('Phone number is required');
    if (!address) errors.push('Address is required');
    if (!salary) errors.push('Salary is required');

    return errors;
};

// Create a new HumanResource entry
const createHumanResource = async (req, res) => {
    try {
        const {
            fullName,
            position,
            hireDate,
            department,
            email,
            phoneNumber,
            address,
            salary,
            performanceReviews,
            emergencyContact,
            vacationDays,
            benefits,
        } = req.body;

        const errors = validateHumanResourceData(fullName, position, hireDate, department, email, phoneNumber, address, salary);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newHumanResource = new HumanResource({
            fullName,
            position,
            hireDate,
            department,
            email,
            phoneNumber,
            address,
            salary,
            performanceReviews,
            emergencyContact,
            vacationDays,
            benefits,
        });

        await newHumanResource.save();
        res.status(201).json({ message: 'HumanResource entry created', humanResource: newHumanResource });
    } catch (error) {
        res.status(400).json({ message: 'Error creating HumanResource entry', error });
    }
};

// Get all HumanResource entries
const getAllHumanResources = async (req, res) => {
    try {
        const humanResources = await HumanResource.find();
        res.status(200).json({ humanResources });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching HumanResource entries', error });
    }
};

// Get a HumanResource entry by ID
const getHumanResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const humanResource = await HumanResource.findById(id);

        if (!humanResource) {
            return res.status(404).json({ message: 'HumanResource entry not found' });
        }

        res.status(200).json({ humanResource });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching HumanResource entry', error });
    }
};

// Update a HumanResource entry
const updateHumanResource = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fullName,
            position,
            hireDate,
            department,
            email,
            phoneNumber,
            address,
            salary,
            performanceReviews,
            emergencyContact,
            vacationDays,
            benefits,
        } = req.body;

        const updatedHumanResource = await HumanResource.findByIdAndUpdate(
            id,
            {
                fullName,
                position,
                hireDate,
                department,
                email,
                phoneNumber,
                address,
                salary,
                performanceReviews,
                emergencyContact,
                vacationDays,
                benefits,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'HumanResource entry updated', humanResource: updatedHumanResource });
    } catch (error) {
        res.status(400).json({ message: 'Error updating HumanResource entry', error });
    }
};

// Delete a HumanResource entry
const deleteHumanResource = async (req, res) => {
    try {
        const { id } = req.params;
        await HumanResource.findByIdAndDelete(id);

        res.status(200).json({ message: 'HumanResource entry deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting HumanResource entry', error });
    }
};

// Export the controller methods
module.exports = {
    createHumanResource,
    getAllHumanResources,
    getHumanResourceById,
    updateHumanResource,
    deleteHumanResource,
};


