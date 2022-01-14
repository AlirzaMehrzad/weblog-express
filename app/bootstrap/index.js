const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mysqlStore = require('express-mysql-session')(session);
const mysqlOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
}
const sessionStore = new mysqlStore(mysqlOptions);

var hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
      foo: function () { return 'FOO!'; },
      bar: function () { return 'BAR!'; }
    }
  });
  
  
module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(cookieParser());
    app.use(session({
      store: sessionStore,
      secret: 'aksdhqh3930ehdc03he093h',
      resave: true,
      saveUninitialized: true,
      cookie: {maxAge: 60000}
    }));
    app.use(flash())
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '../../public')));
};