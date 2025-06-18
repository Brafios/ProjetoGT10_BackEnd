const express = require('express');
const router = express.Router();

const { registro, login, recuperarSenha, atualizarSenha } = require('../controllers/authController');

router.post('/register', registro);
router.post('/login', login);
router.post('/recover-password', recuperarSenha)
router.post('/update-password', atualizarSenha)

module.exports = router;