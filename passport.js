const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const MongoUsers = require ("./src/mongoose")
const transport = require("./src/utils/transport")

const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}

passport.use('registracion', new LocalStrategy( strategyOptions, async (req, username, password, callback) => {
  const { email, name, surname, address, age, phone } = req.body;

  const user = (await MongoUsers.findUser(username))[0]
  if (user) {return callback()}
  const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
  const newUser = { username, password: passwordHasheado, email, name, surname, address, age, phone };
  MongoUsers.addUser(newUser)

  transport.sendMail({
    from: "Facundo <facu.villarroel96@gmail.com>",
    to:process.env.GMAIL_USER,
    html:`<h1>Datos del nuevo usuario</h1>
          <p>Email: ${email}</p>
          <p>Nombre: ${name}</p>
          <p>Apellido: ${surname}</p>
          <p>Dirección: ${address}</p>
          <p>Edad: ${age}</p>
          <p>Teléfono: ${phone}</p>`,
    subject:"Nuevo Usuario Creado!"
  }).then((result) => {
    console.log(result);
  }).catch(console.log) 
  
  callback(null, newUser);
}));

passport.use('autenticacion', new LocalStrategy(async (username, password, callback) => {
  const user = (await MongoUsers.findUser(username))[0]
  if (!user || !bcrypt.compareSync(password, user.password)) return callback();
  callback(null, user);
}));

passport.serializeUser((user, callback) => {
  callback(null, user.username);
});

passport.deserializeUser(async (username, callback) => {
  const user = (await MongoUsers.findUser(username))[0]
  callback(null, user);
});

module.exports = passport;