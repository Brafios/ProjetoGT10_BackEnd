const app = require('./app')

const cors = require('cors');

app.use(cors());

app.listen(3000, () => {
  console.log('Servidor rodando em projeto-gt-10-back-end.vercel.app');
});

