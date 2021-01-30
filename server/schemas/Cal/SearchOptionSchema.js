const mongoose = require('mongoose');

const itemOptionSchema = new mongoose.Schema({
  name: { type: String },
  s1: { type: Number },
  s2: { type: Number },
  s3: { type: Number },
  s4: { type: Number },
  s5: { type: Number },
  s6: { type: Number },
  s7: { type: Number },
  s8: { type: Number },
  s9: { type: Number },
  s10: { type: Number },
});

itemOptionSchema.statics.findByFilter = function(filter) {
  return this.find(filter);
}

module.exports = mongoose.model("ItemSearch", itemOptionSchema, "itemOption");