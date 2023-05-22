const Icon = require("../models/Icons");

const createIcon = async (req, res) => {
  try {
    const { icon, title } = req.body;
    const newIcon = await Icon.create({ icon, title });
    console.log("Error in the server", newIcon);
    res.status(201).json(newIcon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIcon,
};