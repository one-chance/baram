const mongoose = require('mongoose');

const signUpUserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  createDateString: { type: String, required: true },
  editDateString: { type: String, required: true }
}, { timestamps: true });

// Create new todo document
signUpUserSchema.statics.create = function (payload) {
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Get by user id
signUpUserSchema.statics.findOneById = function (id) {
  return this.findOne({id: id});
}

// Change Password
signUpUserSchema.statics.changePassword = function (id, payload) {
  return this.findOneAndUpdate({ id: id }, { $set: payload }, { upsert: true, new: true });
}

module.exports = mongoose.model("SignUpUser", signUpUserSchema, "user");