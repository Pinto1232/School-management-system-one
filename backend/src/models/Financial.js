const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Financial model
const financialSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  receiptNumber: {
    type: String,
    required: true,
  },
  budgetReport: {
    type: Object,
    required: true,
  },
  incomeReport: {
    type: Object,
    required: true,
  },
  expenditureReport: {
    type: Object,
    required: true,
  },
  balanceSheet: {
    type: Object,
    required: true,
  },
  accountsPayableReport: {
    type: Object,
    required: true,
  },
  accountsReceivableReport: {
    type: Object,
    required: true,
  },
  studentFeeReport: {
    type: Object,
    required: true,
  },
  donorReport: {
    type: Object,
    required: true,
  },
  financialTrendAnalysis: {
    type: Object,
    required: true,
  },
});

// Compile the schema into a model
const Financial = mongoose.model('Financial', financialSchema);

// Function to create a new instance of the Financial model and save it to the database
const createFinancial = async () => {
  try {
    const newFinancial = new Financial({
      transactionId: 'T12345',
      date: new Date(),
      studentId: 'S12345',
      type: 'Fee',
      amount: 5000,
      paymentMethod: 'Online',
      receiptNumber: 'R12345',
      budgetReport: {},
      incomeReport: {},
      expenditureReport: {},
      balanceSheet: {},
      accountsPayableReport: {},
      accountsReceivableReport: {},
      studentFeeReport: {},
      donorReport: {},
      financialTrendAnalysis: {},
    });
  
    await newFinancial.save();
    console.log('Financial transaction saved successfully');
  } catch (error) {
    console.log('Error saving financial transaction:', error);
  }
};

// Export the createFinancial function
module.exports = createFinancial;
