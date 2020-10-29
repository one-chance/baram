const mongoose = require('mongoose');

const accountInfoSchema = new mongoose.Schema({
  id: { type: String, require: true},
  server: { type: String, require: true },
  character: { type: String, require: true },
  authDateString: { type: String, required: false }
});

// Create new todo document
accountInfoSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// Find All by user id
accountInfoSchema.statics.findAllById = function (id) {
  return this.find({
    id: id
  });
}
// Delete by user key
accountInfoSchema.statics.deleteByKey = function (key) {
  return this.remove({ key: key });
}

// Delete by user id
accountInfoSchema.statics.deleteById = function (id) {
  return this.deleteMany({ id: id }, (err, result) => {
    if (err) {
      return err;
    }

    return result;
  });
}

// Check Exist
accountInfoSchema.statics.checkAccount = function (server, character) {
  return this.findOne({
    server: server,
    character: character
  });
}

module.exports = mongoose.model("AccountInfo", accountInfoSchema, "accountInfo");
