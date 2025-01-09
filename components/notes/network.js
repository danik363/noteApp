const router = require("express").Router();
const controller = require("./controller.js");
const { isAuthenticated } = require("../../auth.js");
const ownerAuth = require("./utils.js");

router.get("/", isAuthenticated, (req, res) => {
  controller
    .listNotes({ userId: req.user._id })
    .then((notes) => {
      res.status(200).render("pages/notes.ejs", { notes: notes });
    })
    .catch((err) => {
      res.status(500).redirect("/errors/500");
    });
});

router.get("/create", isAuthenticated, (req, res) => {
  res.render("pages/createNote.ejs");
});
router.post("/create", isAuthenticated, (req, res) => {
  controller
    .createNote({
      name: req.body.name,
      userId: req.user._id,
      content: req.body.content,
    })
    .then((note) => {
      res.status(201).redirect("/notes");
    })
    .catch((err) => {
      res.status(500).redirect("/errors/500");
    });
});

router.get("/edit/:id", isAuthenticated, ownerAuth, (req, res) => {
  controller
    .listNotes({ _id: req.params.id })
    .then((note) => {
      res.status(200).render("pages/editNote.ejs", { note: note[0] });
    })
    .catch((err) => {
      res.status(500).redirect("/errors/404");
    });
});
router.post("/edit/:id", isAuthenticated, ownerAuth, (req, res) => {
  controller
    .updateNote(req.params.id, {
      userId: req.user._id,
      content: req.body.content,
      name: req.body.name,
    })
    .then((result) => {
      res.status(200).redirect("/notes");
    })
    .catch((err) => {
      res.status(500).redirect("/errors/500");
    });
});

router.get("/delete/:id", isAuthenticated, ownerAuth, (req, res) => {
  controller
    .deleteNote({ _id: req.params.id })
    .then((result) => {
      res.status(200).redirect("/notes");
    })
    .catch((err) => {
      res.status(500).redirect("/errors/500");
    });
});

module.exports = router;
