const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  idx: { type: Number },
  name: { type: String },
  op1: { type: Number },
  op2: { type: Number },
  op3: { type: Number },
  power: { type: Number },
});

const marketContentSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  server: { type: Number, default: 0, required: true },
  item: { type: itemSchema, required: true },
  price: { type: Number, required: true },
  writer: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

marketContentSchema.statics.findAll = function () {
  return this.find({});
}

marketContentSchema.statics.findByFilter = function (filter) {
  return this.find(filter);
}

marketContentSchema.statics.create = function (payload) {
  return new this(payload).save();
}

module.exports = mongoose.model("Market", marketContentSchema, "marketContent");