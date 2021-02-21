const mongoose = require('mongoose');

const signInLogSchema = new mongoose.Schema({
  userId: { type: String, require: true},
  signInIP: { type: String, require: true},
  signInDate: { type: Date, required: false, default: new Date() }
});

signInLogSchema.statics.create = function (payload) {
  return new this(payload).save();
};

module.exports = mongoose.model("SingInLog", signInLogSchema, "signInLog");