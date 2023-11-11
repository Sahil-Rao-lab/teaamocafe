// Navigation.js

const mongoose = require('mongoose');

const navigationSchema = new mongoose.Schema({
  linkName: String,
  linkURL: String,
  openLinkInNewTab: Boolean,
  linkType: String,
  linkPosition: String,
  subLinkOf: String
});

// Before defining the model, clear existing model if it exists
if (mongoose.connection.models['Navigation']) {
  delete mongoose.connection.models['Navigation'];
}

// Define the Navigation model
const Navigation = mongoose.model('Navigation', navigationSchema);

module.exports = Navigation;
