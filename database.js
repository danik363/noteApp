const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function connection(url) {
  mongoose.set("strictQuery", true);
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Database connected");
}

module.exports = { connection };
