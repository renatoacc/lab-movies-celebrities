const { default: mongoose } = require("mongoose");
const { model, Schema } = require("mongoose");

const movieSchema = Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: String,
  plot: String,
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "celebrity",
    },
  ],
});

const movie = model("movie", movieSchema);

module.exports = movie;
