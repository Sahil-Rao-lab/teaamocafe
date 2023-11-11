// Slides.js

const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  slideTitle: String,
  slideDescription: String,
  slideLinkName: Boolean,
  slideLinkURL: String,
  slideImage: Buffer
});

// Before defining the model, clear existing model if it exists
if (mongoose.connection.models['Slide']) {
  delete mongoose.connection.models['Slide'];
}

// Define the Slide model
const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
