const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  mode: { type: String},
  newImageCount: { type: Number, default: 0 }
});

// Change by mode
configSchema.statics.updateByMode = function (mode, payload) {
  return this.findOneAndUpdate({ mode: mode }, { $set: payload }, { upsert: true, new: true });
}

module.exports = mongoose.model("Config", configSchema, "config");