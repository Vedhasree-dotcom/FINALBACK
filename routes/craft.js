const express = require("express");
const router = express.Router();
const craftController = require("../controllers/CraftController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploads");


// Public routes
router.get("/", craftController.getAllCrafts);
router.get("/category/:category", craftController.getCraftsByCategory);
router.get("/:id", craftController.getCraftById);

// Admin route
router.post("/", protect, adminOnly, craftController.createCraft);


router.post(
  "/find",
  protect,
  upload.single("image"),
  craftController.findCraftsByMaterial
);


module.exports = router;
