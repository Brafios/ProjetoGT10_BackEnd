const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')
const noticiaRoute = require('./routes/NoticiasRoutes')

const app = express();
const corsOptions = {
  // Lista de URLs do seu frontend que têm permissão para acessar este backend
  origin: [
    'http://localhost:5173',                   // Para seu desenvolvimento local
    'https://projeto-gt-10-full-stack.vercel.app' // A URL do seu deploy na Vercel
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
app.use('/noticia', noticiaRoute);


module.exports = app;