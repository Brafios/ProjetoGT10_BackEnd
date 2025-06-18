const express = require('express');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')
const noticiaRoute = require('./routes/NoticiasRoutes')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API rodando');
})

app.use('/auth', AuthRoute);
app.use('/associacoes', associacaoRoute);
app.use('/noticia', noticiaRoute);


module.exports = app;