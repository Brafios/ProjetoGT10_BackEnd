const express = require('express');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API rodando');
})

app.use('/auth', AuthRoute);
app.use('/associacoes', associacaoRoute);

module.exports = app;