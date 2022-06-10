/** @format */

const { user_game } = require('./models');
const bcrypt = require('bcrypt');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'nama_pengguna', passwordField: 'kata_sandi' }, async function (nama_pengguna, kata_sandi, done) {
    try {
      const user = await user_game.findOne({ where: { nama_pengguna: nama_pengguna } });
      if (!user) {
        return done(null, false, { message: 'Nama pengguna salah.' });
      }
      const passVal = await bcrypt.compare(kata_sandi, user.kata_sandi);
      if (!passVal) {
        return done(null, false, { message: 'Kata sandi salah.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user_game.findByPk(id).then(function (user) {
    done(null, user);
  });
});