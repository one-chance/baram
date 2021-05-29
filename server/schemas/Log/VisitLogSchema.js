const mongoose = require("mongoose");

const visitLogSchema = new mongoose.Schema({
  year: { type: String, requrie: true },
  month: { type: String, requrie: true },
  day: { type: String, requrie: true },
  dayCount: { type: Number, requrie: true, default: 0 },
  visitors: [
    {
      ip: { type: String, require: true },
      visitDate: { type: Date, requrie: true },
    },
  ],
});

visitLogSchema.statics.addVisitor = function (visitor) {
  const today = new Date();

  return this.findOneAndUpdate(
    {
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day: today.getDate().toString(),
    },
    {
      $inc: { dayCount: 1 },
      $push: { visitors: visitor },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

visitLogSchema.statics.getTodayVisitor = function () {
  const today = new Date();

  return this.findOne({
    year: today.getFullYear().toString(),
    month: (today.getMonth() + 1).toString(),
    day: today.getDate().toString(),
  });
};
module.exports = mongoose.model("visitLog", visitLogSchema, "visitLog");
