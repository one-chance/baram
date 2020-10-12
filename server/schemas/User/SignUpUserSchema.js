const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const signUpUserSchema = new mongoose.Schema({
  key: { type: Number, default: 0, require: true, unique: true },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  createDateString: { type: String, required: true },
  editDateString: { type: String, required: true }
}, { timestamps: true });
signUpUserSchema.plugin(autoIncrement.plugin, {
  model: "user",
  field: "key",
  startAt: 10000000,
  increment: 1
});

// Create new todo document
signUpUserSchema.statics.create = function (payload) {
  return new this(payload).save();
};

// Get by user key
signUpUserSchema.statics.findOneByKey = function (key) {
  return this.findOne({ key: key });
}

// Get by user id
signUpUserSchema.statics.findOneById = function (id) {
  return this.findOne({ id: id });
}

// Change Password by user key
signUpUserSchema.statics.updateByKey = function (key, payload) {
  return this.findOneAndUpdate({ key: key }, { $set: payload }, { upsert: true, new: true });
}

// Change Password by user id
signUpUserSchema.statics.updateById = function (id, payload) {
  return this.findOneAndUpdate({ id: id }, { $set: payload }, { upsert: true, new: true });
}

// Delete by user key
signUpUserSchema.statics.deleteByKey = function (key) {
  return this.remove({ key: key });
}

// Delete by user id
signUpUserSchema.statics.deleteById = function (id) {
  return this.deleteOne({ id: id }, (err, result) => {
    if (err) {
      return err;
    }

    return result;
  });
}

module.exports = mongoose.model("SignUpUser", signUpUserSchema, "user");
