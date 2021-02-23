const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  item: { type: String, required: true },
  price: { type: Number, required: true },
  writer: { type: String, required: true },
  remainDate: { type: Date, required: true },
});

marketItemSchema.statics.findByFilter = function (filter) {
  return this.find(filter).sort({seq: -1});
}

module.exports = mongoose.model("Market", marketItemSchema, "marketItem");