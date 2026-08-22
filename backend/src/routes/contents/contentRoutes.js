const express = require("express");
const router = express.Router();
const contentController = require("../../controllers/contents/contentController");
const authenticate = require('../../middlewares/authenticate');
const { authorize } = require('../../middlewares/authorize');

// Create new content
router.post("/content", authenticate, authorize(['platform_admin']), contentController.createContent);

// Get all content
router.get("/content", contentController.getAllContent);

// Get all content for a specific section
router.get("/content/section/:section", contentController.getContentBySection);

// Get a single content by ID
router.get("/content/:id", contentController.getContentById);

// Update content
router.put("/content/:id", authenticate, authorize(['platform_admin']), contentController.updateContent);

// Delete content
router.delete("/content/:id", authenticate, authorize(['platform_admin']), contentController.deleteContent);

module.exports = router;
