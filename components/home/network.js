const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { logout } = require("../../auth.js");

//Renderiza pagina de inicio
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/notes");
  } else {
    res.render("login.ejs");
  }
});
router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/notes");
  } else {
    res.render("register.ejs");
  }
});

//Midleware de register de usuario
router.post(
  "/register",
  body("email").exists(),
  body("email").isEmail(),
  body("password").exists(),
  body("password").isLength({ min: 5 }),
  body("username").exists(),
  body("username").isAlphanumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "signupMessage",
        "Por favor ingresar los datos de forma correcta"
      );
      res.status(400).redirect("/register");
      console.log("error");
    } else {
      next();
    }
  },
  passport.authenticate("local-signup", {
    successRedirect: "/notes",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

//Renderiza plantilla de login
// router.get('/login', (req, res)=>{
//     res.render('login.ejs');
// });

//Midleware de autenticacion de usuario
router.post(
  "/login",
  body("email").exists(),
  body("email").isEmail(),
  body("password").exists(),
  body("password").isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("signupMessage", "Las credenciales no cumplen con los requisitos minimos");
      res.status(400).redirect("/");
      console.log("error");
    } else {
      next();
    }
  },
  passport.authenticate("local-signin", {
    successRedirect: "/notes",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", logout);

module.exports = router;
