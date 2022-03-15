const router = require("express").Router();

router.use(require("./celebrities.routes.js"));
router.use(require("./movies.routes.js"));

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
