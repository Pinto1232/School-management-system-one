const express = require("express");
const router = express.Router();
const contentController = require("../../controllers/contents/contentController");

// Create new content
router.post("/content", contentController.createContent);

// Get all content
router.get("/content", contentController.getAllContent);

// Get all content for a specific section
router.get("/content/section/:section", contentController.getContentBySection);

// Get a single content by ID
router.get("/content/:id", contentController.getContentById);

// Update content
router.put("/content/:id", contentController.updateContent);

// Delete content
router.delete("/content/:id", contentController.deleteContent);

module.exports = router;
