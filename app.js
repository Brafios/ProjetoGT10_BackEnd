const express = require('express');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')

const app = express();
app.use(express.json());

app.use('/auth', AuthRoute);
app.use(associacaoRoute);

module.exports = app;