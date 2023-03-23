const passport = require("passport");

//Verifica que el usuario este autenticado accediendo a las cookies de la req y verificando el id de la sesion
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

//Permite cerrar sesion
function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  isAuthenticated,
  logout,
};
