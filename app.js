const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const app = express();
// app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

module.exports = app;
