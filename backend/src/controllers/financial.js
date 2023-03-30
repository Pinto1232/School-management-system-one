const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Finance = require('../models/Finance')


// Helper function to handle validation and error messages
const validateFinanceData = (name, category, amount, date, student, paymentMethod, invoiceNumber, dueDate, status) => {
    const errors = [];
    if (!name) errors.push('Name is required');
    if (!category) errors.push('Category is required');
    if (!amount) errors.push('Amount is required');
    if (!date) errors.push('Date is required');
    if (!student) errors.push('Student is required');
    if (!paymentMethod) errors.push('Payment method is required');
    if (!invoiceNumber) errors.push('Invoice number is required');
    if (!dueDate) errors.push('Due date is required');
    if (!status) errors.push('Status is required');

    return errors;
};

// Create a new finance record
const createFinance = async (req, res) => {
    try {
        const { name, category, amount, date, description, student, faculty, paymentMethod, invoiceNumber, dueDate, status } = req.body;

        const errors = validateFinanceData(name, category, amount, date, student, paymentMethod, invoiceNumber, dueDate, status);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newFinance = new Finance({ name, category, amount, date, description, student, faculty, paymentMethod, invoiceNumber, dueDate, status });
        await newFinance.save();

        res.status(201).json({ message: 'Finance record created', finance: newFinance });
    } catch (error) {
        res.status(400).json({ message: 'Error creating finance record', error });
    }
};

// Get all finance records
const getAllFinances = async (req, res) => {
    try {
        const financeRecords = await Finance.find().lean();
        console.log('Before populating:', financeRecords);

        const populatedFinanceRecords = await Finance.find()
            .populate({ path: 'student', model: 'Student', select: 'firstName lastName email' })
            .populate({ path: 'faculty', model: 'Faculty', select: 'firstName lastName email' })
            .lean();
        console.log('After populating:', populatedFinanceRecords);

        res.status(200).json({ finances: populatedFinanceRecords });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(400).json({ message: 'Error fetching finance records', error: error.message });
    }
};






// Get a finance record by ID
const getFinanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const financeRecord = await Finance.findById(id).populate('student faculty');

        if (!financeRecord) {
            return res.status(404).json({ message: 'Finance record not found' });
        }

        res.status(200).json({ finance: financeRecord });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching finance record', error });
    }
};

// Update a finance record
const updateFinance = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, amount, date, description, student, faculty, paymentMethod, invoiceNumber, dueDate, status } = req.body;

        const errors = validateFinanceData(name, category, amount, date, student, paymentMethod, invoiceNumber, dueDate, status);
        if (errors.length > 0) return res.status(400).json({ errors });

        const updatedFinance = await Finance.findByIdAndUpdate(
            id,
            { name, category, amount, date, description, student, faculty, paymentMethod, invoiceNumber, dueDate, status },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Finance record updated', finance: updatedFinance });
    } catch (error) {
        res.status(400).json({ message: 'Error updating finance record', error });
    }
};

// Delete a finance record
const deleteFinance = async (req, res) => {
    try {
        const { id } = req.params;
        await Finance.findByIdAndDelete(id);

        res.status(200).json({ message: 'Finance record deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting finance record', error });
    }
};

// Export the controller methods
module.exports = {
    createFinance,
    getAllFinances,
    getFinanceById,
    updateFinance,
    deleteFinance,
};

