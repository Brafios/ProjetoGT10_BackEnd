const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')
const noticiaRoute = require('./routes/NoticiasRoutes')

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://projeto-gt-10-full-stack.vercel.app'
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API rodando');
})

app.use('/auth', AuthRoute);
app.use('/associacoes', associacaoRoute);
app.use('/noticias', noticiaRoute);


module.exports = app;