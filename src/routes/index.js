const express = require('express');
const app = express();

app.use(require('./views'));
app.use(require('./rates'));

module.exports = app;