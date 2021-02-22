const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  mode: { type: String},
  newImageCount: { type: Number, default: 0 },
  totalVisitorCount: { type: Number, default: 0 }
});

// Get RuntimeConfig
configSchema.statics.getRuntimeConfig = function (mode) {
  return this.findOne({ mode: mode});
}

// Change by mode
configSchema.statics.updateByMode = function (mode, payload) {
  return this.findOneAndUpdate({ mode: mode }, { $set: payload }, { upsert: true, new: true });
}

// Add Total Count
configSchema.statics.addTotalVisitorCount = function (mode) {
  return this.findOneAndUpdate({ mode: mode }, { $inc: {totalVisitorCount: 1}  }, { upsert: true, new: true });
}

// Add New Image Count
configSchema.statics.addNewImageCount = function (mode) {
  return this.findOneAndUpdate({ mode: mode }, { $inc: {newImageCount: 1}  }, { upsert: true, new: true });
}

module.exports = mongoose.model("Config", configSchema, "config");