const Content = require("../../models/Contents/Content");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array("images", 10);

// Create new content
exports.createContent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ error: "File upload error", details: err.message });
    }

    try {
      const imagePaths = req.files.map((file) => file.path);
      const contentData = {
        ...req.body,
        images: imagePaths,
      };

      const content = new Content(contentData);
      await content.save();
      res.status(201).json(content);
    } catch (error) {
      console.error("Failed to create content:", error);
      res
        .status(400)
        .json({ error: "Failed to create content", details: error.message });
    }
  });
};

// Get all content for a specific section
exports.getContentBySection = async (req, res) => {
  try {
    const contents = await Content.find({ section: req.params.section });
    res.status(200).json(contents);
  } catch (error) {
    console.error("Failed to retrieve content:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve content", details: error.message });
  }
};

// Get a single content by ID
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      console.error("Content not found:", req.params.id);
      return res.status(404).json({ error: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error("Failed to retrieve content:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve content", details: error.message });
  }
};

// Update content
exports.updateContent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res
        .status(400)
        .json({ error: "File upload error", details: err.message });
    }

    try {
      const imagePaths = req.files.map((file) => file.path);
      const contentData = {
        ...req.body,
        images: imagePaths,
      };

      const content = await Content.findByIdAndUpdate(
        req.params.id,
        contentData,
        { new: true, runValidators: true }
      );
      if (!content) {
        console.error("Content not found:", req.params.id);
        return res.status(404).json({ error: "Content not found" });
      }
      res.status(200).json(content);
    } catch (error) {
      console.error("Failed to update content:", error);
      res
        .status(400)
        .json({ error: "Failed to update content", details: error.message });
    }
  });
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      console.error("Content not found:", req.params.id);
      return res.status(404).json({ error: "Content not found" });
    }

    // Delete associated images from the filesystem
    content.images.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imagePath}`, err);
        }
      });
    });

    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    console.error("Failed to delete content:", error);
    res
      .status(500)
      .json({ error: "Failed to delete content", details: error.message });
  }
};
