const Campus = require('../models/CampusSafety');

// Helper function to handle validation and error messages
const validateCampusData = (name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies) => {
    const errors = [];
    if (!name) errors.push('Name is required');
    if (!location) errors.push('Location is required');
    if (!size) errors.push('Size is required');
    if (!securityPhoneNumber) errors.push('Security phone number is required');
    if (!securityEmail) errors.push('Security email is required');
    if (!emergencyProcedures) errors.push('Emergency procedures are required');
    if (!medicalFacility) errors.push('Medical facility information is required');
    if (!securityStaff) errors.push('Security staff is required');
    if (!safetyPolicies) errors.push('Safety policies are required');

    return errors;
};

// Create a new campus
const createCampus = async (req, res) => {
    try {
        const { name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies } = req.body;

        const errors = validateCampusData(name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newCampus = new Campus({ name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies });
        await newCampus.save();

        res.status(201).json({ message: 'Campus created', campus: newCampus });
    } catch (error) {
        res.status(400).json({ message: 'Error creating campus', error });
    }
};

// Get all campuses
const getAllCampuses = async (req, res) => {
    try {
        const campuses = await Campus.find();
        res.status(200).json({ campuses });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching campuses', error });
    }
};

// Get a campus by ID
const getCampusById = async (req, res) => {
    try {
        const { id } = req.params;
        const campus = await Campus.findById(id);

        if (!campus) {
            return res.status(404).json({ message: 'Campus not found' });
        }

        res.status(200).json({ campus });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching campus', error });
    }
};

// Update a campus
const updateCampus = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies } = req.body;

        const errors = validateCampusData(name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedCampus = await Campus.findByIdAndUpdate(
            id,
            { name, location, size, securityPhoneNumber, securityEmail, emergencyProcedures, medicalFacility, securityStaff, safetyPolicies },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Campus updated', campus: updatedCampus });
    } catch (error) {
        res.status(400).json({ message: 'Error updating campus', error });
    }
};

// Delete a campus
const deleteCampus = async (req, res) => {
    try {
        const { id } = req.params;
        await Campus.findByIdAndDelete(id);

        res.status(200).json({ message: 'Campus deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting campus', error });
    }
};

// Export the controller methods
module.exports = {
    createCampus,
    getAllCampuses,
    getCampusById,
    updateCampus,
    deleteCampus,
};
