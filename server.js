const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/authRoute');
const associacaoRoute = require('./routes/AssociationRoute')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', AuthRoute);
app.use(associacaoRoute);

app.listen(3000, () => {
  console.log('Servidor rodando em projeto-gt-10-back-end.vercel.app');
});

