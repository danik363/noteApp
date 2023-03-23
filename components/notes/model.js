const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const note = new Schema({
  name: String,
  userId: String,
  content: String,
  lastUpdate: Date,
});

const model = mongoose.model("Notes", note);

module.exports = model;
