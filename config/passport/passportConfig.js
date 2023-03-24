const LocalStrategy = require('passport-local').Strategy;
const User = require('../../components/user/model.js');
const passport = require('passport');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
const user = await User.findById(id);
    done(null, user);
});
  
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
  },async (req, username, password, done) => {
  const user = await User.findOne({ $or: [{ email: username }, { username: password }]});
  console.log('username '+ username);
  if(user) {
    return done(null, false, req.flash('signupMessage', 'El usuario o email ya existen'));
  }else{
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
      .then(async (passwordEncrypt)=>{
        const newUser = new User({
          email: req.body.email, 
          username: req.body.username,
          password: passwordEncrypt,
          name: req.body.name,
          surname: req.body.surname,
          createDate: Date()
        });
        await new User(newUser).save();
        return done(null, newUser);
      }).catch((err)=>{
        req.flash('signupMessage', 'Hubo un error al crear el usuario por favor volver a intentar');
        console.log('Error al encriptar la contraseña');
      })
   
  }
  
}));
  

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },async (req, username, password, done) => {
    const user = await User.findOne({email:username});
    bcrypt.compare(password, user.password)
      .then((result)=>{
        if(result) {
          return done(null, user);
        }else{
          return done(null, false, req.flash('signinMessage', 'Credenciales Invalidas'));
        }
      })
    
  }));
    