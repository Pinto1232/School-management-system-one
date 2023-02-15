const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentID: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  },
  paymentDescription: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPhoneNumber: {
    type: String,
    required: true
  },
  invoiceID: {
    type: String,
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  invoiceAmount: {
    type: Number,
    required: true
  },
  invoiceStatus: {
    type: String,
    required: true
  },
  invoiceDescription: {
    type: String,
    required: true
  }
});

const Payment = mongoose.model("Payment", paymentSchema);

const createPayment = async (paymentID, paymentDate, paymentAmount, paymentMethod, paymentStatus, paymentDescription, userID, userName, userEmail, userPhoneNumber, invoiceID, invoiceDate, invoiceAmount, invoiceStatus, invoiceDescription) => {
  const payment = new Payment({
    paymentID,
    paymentDate,
    paymentAmount,
    paymentMethod,
    paymentStatus,
    paymentDescription,
    userID,
    userName,
    userEmail,
    userPhoneNumber,
    invoiceID,
    invoiceDate,
    invoiceAmount,
    invoiceStatus,
    invoiceDescription
  });

  try {
    const result = await payment.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createPayment;
