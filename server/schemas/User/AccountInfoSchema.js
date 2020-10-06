const mongoose = require('mongoose');

const accountInfoSchema = new mongoose.Schema({
  id: { type: String, require: true },
  server: { type: String, require: true },
  character: { type: String, require: true },
  authDateString: { type: String, required: false }
});

// Create new todo document
accountInfoSchema.statics.create = function (id, payload) {
  const accountInfo = new this(payload);
  accountInfo.id = id;

  return accountInfo.save();
}

// Check Exist
accountInfoSchema.statics.checkAccount = function (id, server, character) {
  return this.findOne({
    id: id,
    server: server,
    character: character
  });
}

module.exports = mongoose.model("AccountInfo", accountInfoSchema, "accountInfo");
