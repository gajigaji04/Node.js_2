const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },

  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Posts", postSchema);
