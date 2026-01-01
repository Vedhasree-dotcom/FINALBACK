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
  category: {
    type: String,
    enum: ["paper", "home-decor", "painting", "clay", "knitting"],
  },
  materials: [ { 
    type: String, 
    required: true ,
  },
],
  tutorialSteps: [tutorialStepSchema],
});


module.exports = mongoose.model("Craft", craftSchema);
