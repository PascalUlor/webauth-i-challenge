const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(
  session({
    name: 'sessionId', // name of the cookie
    secret: 'keep it secret, keep it long', // we intend to encrypt
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    // extra chunk of config
    store: new KnexSessionStore({
      knex: require('./database/dbConfig'), // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60 // time it takes to check for old sessions and remove them from the database to keep it clean and performant
    })
  })
);

const PORT = process.env.PORT || 4000;

app.use('/api/user', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
