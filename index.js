const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config(".env");
const routes = require("./network/routes.js");
const db = require("./database.js");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

///Inicializando
const app = express();
db.connection(process.env.DB);
require("./config/passport/passportConfig.js");

///Configuraciones

app.set("views", "./views/pages");
app.set("view engine", "ejs");

///MidleWares de terceros
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mysecretpasswdasdord",
    resave: true,
    saveUninitializaed: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});

module.exports = app