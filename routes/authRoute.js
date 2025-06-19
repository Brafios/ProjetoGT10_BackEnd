const express = require('express');
const router = express.Router();

const { registro, login, recuperarSenha, atualizarSenha, getMe, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registro);
router.post('/login', login);
router.post('/request-password-reset', recuperarSenha);
router.post('/update-password', atualizarSenha);
router.post('/logout', authMiddleware, logout)
router.get('/me', authMiddleware, getMe);

module.exports = router;