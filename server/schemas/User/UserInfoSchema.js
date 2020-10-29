const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const userInfoSchema = new mongoose.Schema({
  key: { type: Number, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  mail: { type: String, required: false },
  openKakao: { type: String, required: false },
  titleAccount: {
    server: { type: String, required: false },
    character: { type: String, required: false }
  },
  accountList: [
    new mongoose.Schema({
      server: { type: String, required: false },
      character: { type: String, required: false },
      authDateString: { type: String, required: false },
    })
  ],
  isAuth: { type: Boolean, required: false },
  point: { type: Number, required: false },
  grade: { type: String, required: false },
  createDateString: { type: String, required: false },
  editDateString: { type: String, required: false },
  isActive: { type: Boolean, required: false },
});

// Create new userInfo
userInfoSchema.statics.create = function (payload) {
  const user = new this(payload);
  return user.save();
};

// Get by user key
userInfoSchema.statics.findOneByKey = function (key) {
  return this.findOne({key: key});
}

// Get by user id
userInfoSchema.statics.findOneById = function (id) {
  return this.findOne({id: id});
}

// Update by user key
userInfoSchema.statics.updateByKey = function (key, payload) {
  return this.findOneAndUpdate({ key: key }, { $set: payload }, { upsert: true, new: true });
}

// Update by user id
userInfoSchema.statics.updateById = function (id, payload) {
  return this.findOneAndUpdate({ id: id }, { $set: payload }, { upsert: true, new: true });
};

// Add Baram Account by user key
userInfoSchema.statics.pushAccountListByKey = function (key, payload) {
  return this.findOneAndUpdate({ key: key }, { $push: { accountList: payload } }, { upsert: true, new: true });
}

// Add Baram Account by user id
userInfoSchema.statics.pushAccountListById = function (id, payload) {
  return this.findOneAndUpdate({ id: id }, { $push: { accountList: payload } }, { upsert: true, new: true });
};

// Delete by user key
userInfoSchema.statics.deleteByKey = function (key) {
  return this.remove({ key: key });
}

// Delete by user id
userInfoSchema.statics.deleteById = function (id) {
  return this.deleteOne({ id: id }, (err, result) => {
    if (err) {
      return err;
    }

    return result;
  });
}

// Get All UserInfo
userInfoSchema.statics.getAllUserInfo = function () {
  return this.find({});
}

module.exports = mongoose.model("UserInfo", userInfoSchema, "userInfo");