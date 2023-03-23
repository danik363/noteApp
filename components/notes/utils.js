const controller = require("./controller.js");

function ownerAuth(req, res, next) {
  controller
    .listNotes({ userId: req.user._id, _id: req.params.id })
    .then((notes) => {
      if (req.user._id == notes[0].userId) {
        next();
      }
    })
    .catch((err) => {
      console.log("No puede eliminar una nota que no es suya");
      res.redirect("/errors/404");
    });
}

module.exports = ownerAuth;
