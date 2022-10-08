const express = require('express');

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// serving static contents
app.use(express.static('public'))

// routes
app.use('/', require('./routes'))


module.exports = app;

