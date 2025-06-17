const express = require('express');
const cors = require('cors');
const AuthRoute = require('./routes/authRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', AuthRoute);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
