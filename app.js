const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// session
app.use(session({
    secret: 'nevergiveup',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({client: require('./db') }),
    cookie: {
        maxAge: 1000*60*60*24
    }
}))
app.use(flash())

// serving static contents
app.use(express.static('public'))

// routes
app.use('/', require('./routes'))


module.exports = app;

