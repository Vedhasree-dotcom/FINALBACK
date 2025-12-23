const Craft = require("../models/Craft");

/**
 * GET all crafts
 * GET /api/crafts
 */
exports.getAllCrafts = async (req, res) => {
  try {
    const crafts = await Craft.find();
    res.json(crafts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch crafts" });
  }
};

/**
 * GET crafts by category
 * GET /api/crafts/category/:category
 */
exports.getCraftsByCategory = async (req, res) => {
  try {
    const crafts = await Craft.find({
      category: req.params.category,
    });
    res.json(crafts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category crafts" });
  }
};

/**
 * GET single craft details
 * GET /api/crafts/:id
 */
exports.getCraftById = async (req, res) => {
  try {
    const craft = await Craft.findById(req.params.id);
    if (!craft) {
      return res.status(404).json({ message: "Craft not found" });
    }
    res.json(craft);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch craft" });
  }
};

/**
 * CREATE craft (Admin only)
 * POST /api/crafts
 */
exports.createCraft = async (req, res) => {
  try {
    const craft = new Craft(req.body);
    await craft.save();
    res.status(201).json(craft);
  } catch (err) {
    res.status(400).json({ message: "Failed to create craft" });
  }
};
