const router = require("express").Router();

router.get("/404", (req, res) => {
  res.render("errors/notFound.ejs");
});
router.get("/500", (req, res) => {
  res.render("errors/internalServerError.ejs");
});

module.exports = router;
