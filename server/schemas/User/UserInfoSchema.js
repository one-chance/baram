const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const userInfoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  mail: { type: String, required: false },
  server: { type: String, required: false },
  character: { type: String, required: false },
  isAuth: { type: Boolean, required: false },
  point: { type: Number, required: false },
  grade: { type: String, required: false },
  createDateString: { type: String, required: false },
  editDateString: { type: String, required: false },
  authDateString: { type: String, required: false },
  isActive: { type: Boolean, required: false },
});

// Create new todo document
userInfoSchema.statics.create = function (payload) {
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Get by user id
userInfoSchema.statics.findOneById = function (id) {
  return this.findOne({id: id});
}

// Update by user id
userInfoSchema.statics.updateById = function (id, payload) {
  return this.findOneAndUpdate({ id: id }, payload, { upsert: true })
    .then(() => {
      return true;
    })
    .catch((e) => {
      // upsert 동작 시에는 insert가 실행되면서 500 error 가 발생해서, 잘 됐나 확인 해보기.
      this.findOne({id: id})
        .then((user) => {
          return ObjectID.is(user, payload);
        })
    })
};

/*
// Create new todo document
userInfoSchema.statics.create = function (payload) {
  // this === Model
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// Find All
userInfoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by todoid
userInfoSchema.statics.findOneByTodoid = function (todoid) {
  return this.findOne({ todoid });
};

// Update by todoid
userInfoSchema.statics.updateByTodoid = function (todoid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ todoid }, payload, { new: true });
};

// Delete by todoid
userInfoSchema.statics.deleteByTodoid = function (todoid) {
  return this.remove({ todoid });
};

*/
module.exports = mongoose.model("UserInfo", userInfoSchema, "userInfo");