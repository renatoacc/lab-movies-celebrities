const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
const mongoose = require("mongoose");
const async = require("hbs/lib/async");
const movie = require("../models/Movies.model");

// all your routes here
router.get("/movies", async (req, res) => {
  const allmovies = await Movie.find();
  res.render("movies/movies.hbs", { allmovies });
});

router.get("/movies/create", async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie.hbs", { celebrities });
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    res.redirect("/movies/create");
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = mongoose.Types.ObjectId(req.params.id);
    const movie = await Movie.findById(movieId);
    await movie.populate("cast");
    res.render("movies/movie-details.hbs", { movie });
  } catch (err) {
    console.error(err);
  }
});

router.post("/movies/:id/delete", async (req, res) => {
  try {
    const movieId = mongoose.Types.ObjectId(req.params.id);
    await Movie.findByIdAndRemove(movieId);
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
  }
});

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const movieId = mongoose.Types.ObjectId(req.params.id);
    const movie = await Movie.findById(movieId);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie.hbs", { movie, celebrities });
  } catch (err) {
    console.error(err);
  }
});

router.post("/movies/:id/edit", async (req, res) => {
  try {
    const movieId = mongoose.Types.ObjectId(req.params.id);
    await Movie.findByIdAndUpdate(movieId, { ...req.body });
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
