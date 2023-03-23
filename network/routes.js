const home = require("../components/home/network.js");
const user = require("../components/user/network.js");
const notes = require("../components/notes/network.js");
const errors = require("../components/errors/network.js");

function routes(server) {
  server.use((req, res, next) => {
    server.locals.user = req.user;
    server.locals.signinMessage = req.flash("signinMessage");
    server.locals.signupMessage = req.flash("signupMessage");
    next("route");
  });
  server.use("/", home);
  server.use("/notes", notes);
  server.use("/errors/", errors);
}

module.exports = routes;
