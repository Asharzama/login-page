const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/login-page";

mongoose.connect(url);

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const model = mongoose.model("users", userSchema);

module.exports = model;
