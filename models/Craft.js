const mongoose = require("mongoose");

const tutorialStepSchema = new mongoose.Schema({
  stepNumber: Number,
  title: String,
  description: String,
  image: String   
});

const craftSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: {
  type: String,
  required: true
   },
  category: {
    type: String,
    enum: ["paper", "home-decor", "painting", "clay", "knitting"],
  },
  materials: [{ 
    type: String, 
    required: true 
  }],
  tutorialVideo: String,   
  tutorialSteps: [tutorialStepSchema],
});

module.exports = mongoose.model("Craft", craftSchema);
