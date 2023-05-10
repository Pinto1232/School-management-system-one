const Package = require("../models/Packages");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create a new package
const createPackage = async (req, res, next) => {
  try {
    const { name, price, features } = req.body;
    const newPackage = new Package({
      name,
      price,
      features,
      images: req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      })),
    });

    await newPackage.save();

    res.status(201).json({ message: "Package created", package: newPackage });
  } catch (error) {
    next(error);
  }
};

/* const createPackage = async (req, res, next) => {
  try {
    const { basicPlan, proPlan, premiumPlan, feature, imageUrl } = req.body;
    const newPackage = new Package({
      basicPlan,
      proPlan,
      premiumPlan,
      feature,
    });

    //Check if the  request image file exist
    if (req.file) {
      newPackage.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    } else if (imageUrl) {
      newPackage.image = {
        url: imageUrl,
      };
    }

    await newPackage.save();

    res.status(201).json({ message: "Package created", package: newPackage });
  } catch (error) {
    next(error);
  }
}; */

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
    const package = await Packages.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    package.basicPlan = req.body.basicPlan;
    package.proPlan = req.body.proPlan;
    package.premiumPlan = req.body.premiumPlan;
    package.feature = req.body.feature;
    package.packageImage = req.body.packageImage;

    const updatedPackage = await package.save();
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a package by id
const deletePackage = async (req, res) => {
  try {
    const package = await Packages.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    await package.remove();
    res.status(200).json({ message: "Package successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export the controller methods
module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
