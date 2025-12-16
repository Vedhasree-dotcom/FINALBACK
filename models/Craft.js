const mongoose = require("mongoose");

const tutorialStepSchema = new mongoose.Schema({
  stepNumber: Number,
  title: String,
  description: String,
  image: String,
  video: String
});

const craftSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,       
  tutorialSteps: [tutorialStepSchema],
});

module.exports = mongoose.model("Craft", craftSchema);
