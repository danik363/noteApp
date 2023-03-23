const LocalStrategy = require('passport-local').Strategy;
const User = require('../../components/user/model.js');
const passport = require('passport');

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
    const newUser = new User({
      email:req.body.email, 
      username: req.body.username,
      password:req.body.password,
      name:req.body.name,
      surname:req.body.surname
    });
    await new User(newUser).save();
    
    return done(null, newUser);
  }
  
  
}));
  

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },async (req, username, password, done) => {
    const user = await User.findOne({email:username, password:password});
    console.log('username '+ username);
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'No se encuentra el usuario'));
    }
    return done(null, user);
    
  }));
    