const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  Comment: {
    type: String,
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
