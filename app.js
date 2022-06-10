const express = require('express')
const app = express()
const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')
const logger = require("morgan")
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport');
require('./passport-config')



app.use(express.static('public'))
app.use('/uploads/images', express.static('uploads/images'))
app.use('/uploads/videos', express.static('uploads/videos'))

app.use(express.json())
app.use(express.urlencoded({extends: false}))
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.use(logger("dev"))
app.set("view engine", "ejs");

app.use(express.static('public'))

app.use(flash());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize())
app.use(passport.session())

// const YAML = require('yamljs')
// const swaggerDocument = YAML.load('collection.yaml')
// app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const router = require("./routes/index");
app.use(router);





module.exports = app