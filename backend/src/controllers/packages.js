const Package = require("../models/Packages");
const PackageFeedback = require('../models/PackageFeedback');
const asyncHandler = require('../middlewares/asyncHandler');
const multer = require("multer");
const upload = multer();

const normalisePlanKey = (value) => {
  const planKey = String(value || '').trim();
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(planKey)) {
    const error = new Error('The package identifier is invalid.');
    error.statusCode = 400;
    error.code = 'INVALID_PACKAGE_IDENTIFIER';
    throw error;
  }
  return planKey;
};

// Create a new package
const createPackage = async (req, res, next) => {
  try {
    const {
      name,
      price,
      features,
      studentEnrollment,
      personalAcademicRecords,
      attendanceTracking,
      gradebookReportCards,
      healthRecords,
      timetableManagement,
      attendanceManagement,
      gradeExamManagement,
      feePaymentManagement,
      libraryManagement,
      transportManagement,
      humanResourceManagement,
      communicationCollaboration,
      learningManagementSystem,
      parentStudentPortal,
      inventoryAssetManagement,
      eventManagement,
      analyticsReporting,
      securityAccessControl,
    } = req.body;

    // Parse the features JSON string
    const parsedFeatures = JSON.parse(features);

    const newPackage = new Package({
      name,
      price,
      features: parsedFeatures,
      studentEnrollment,
      personalAcademicRecords,
      attendanceTracking,
      gradebookReportCards,
      healthRecords,
      timetableManagement,
      attendanceManagement,
      gradeExamManagement,
      feePaymentManagement,
      libraryManagement,
      transportManagement,
      humanResourceManagement,
      communicationCollaboration,
      learningManagementSystem,
      parentStudentPortal,
      inventoryAssetManagement,
      eventManagement,
      analyticsReporting,
      securityAccessControl,
    });

    // Check if the request image file exists
    if (req.file) {
      newPackage.images.push({
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });
    } else if (req.body.imageUrl) {
      newPackage.images.push({
        url: req.body.imageUrl,
      });
    }

    await newPackage.save();

    res.status(201).json({ message: "Package created", package: newPackage });
  } catch (error) {
    next(error);
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a package by id
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ package });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a package by id
const updatePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    Object.assign(package, req.body);

    const updatedPackage = await package.save();
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a package by id
const deletePackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    await package.deleteOne();
    res.status(200).json({ message: "Package successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPackageFeedback = asyncHandler(async (req, res) => {
  const feedback = await PackageFeedback.find({ userId: req.user.keycloakId })
    .select('planKey liked updatedAt')
    .sort({ updatedAt: -1 });

  res.status(200).json({ feedback });
});

const updatePackageFeedback = asyncHandler(async (req, res) => {
  if (typeof req.body.liked !== 'boolean') {
    const error = new Error('The liked value must be true or false.');
    error.statusCode = 400;
    error.code = 'INVALID_PACKAGE_FEEDBACK';
    throw error;
  }

  const planKey = normalisePlanKey(req.params.planKey);
  const feedback = await PackageFeedback.findOneAndUpdate(
    { userId: req.user.keycloakId, planKey },
    {
      $set: { liked: req.body.liked },
      $setOnInsert: { userId: req.user.keycloakId, planKey },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  ).select('planKey liked updatedAt');

  res.status(200).json({ feedback });
});


module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageFeedback,
  updatePackageFeedback,
  normalisePlanKey,
};
