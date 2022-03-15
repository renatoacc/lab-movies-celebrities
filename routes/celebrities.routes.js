const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

// all your routes here

router.get("/celebrities", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities.hbs", { celebrities });
  } catch (err) {
    console.error(err);
  }
});

router.get("/celebrities/create", async (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", async (req, res) => {
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
    res.redirect("/celebrities/create");
  }
});

router.get("/celebrities/:id", async (req, res) => {
  const celebrityId = mongoose.Types.ObjectId(req.params.id);
  const celebrity = await Celebrity.findById(celebrityId);
  res.render("celebrities/celebrity-details.hbs", { celebrity });
});

router.get("/celebrities/:id/edit", async (req, res) => {
  const celebrityId = mongoose.Types.ObjectId(req.params.id);
  const celebrity = await Celebrity.findById(celebrityId);
  res.render("celebrities/edit-celebrity.hbs", { celebrity });
});

router.post("/celebrities/:id/edit", async (req, res) => {
  try {
    const celebrityId = mongoose.Types.ObjectId(req.params.id);
    await Celebrity.findByIdAndUpdate(celebrityId, { ...req.body });
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
  }
});

router.post("/celebrities/:id/delete", async (req, res) => {
  try {
    const celebrityId = mongoose.Types.ObjectId(req.params.id);
    const moviesCelebrity = await Movie.find({cast: celebrityId});

    moviesCelebrity.forEach(async (movie) => {
      const celebrityIndex = movie.cast.indexOf(celebrityId);
      movie.cast.splice(celebrityIndex, 1);
      await movie.save();
    });

    await Celebrity.findByIdAndRemove(celebrityId);
    res.redirect("/celebrities");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
