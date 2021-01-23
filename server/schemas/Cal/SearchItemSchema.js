const mongoose = require('mongoose');

const itemNameSchema = new mongoose.Schema({
  idx: { type: Number },
  name: { type: String },
  op1: { type: Number },
  op2: { type: Number },
  op3: { type: Number },
  power: { type: Number },
});

itemNameSchema.statics.findByFilter = function(filter) {
  return this.find(filter);
}

module.exports = mongoose.model("ItemSearch", itemNameSchema, "itemList");