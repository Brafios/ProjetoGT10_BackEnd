const express = require('express');
const router = express.Router();
const associacaoController = require('../controllers/AssociationController')
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', associacaoController.list);
router.get('/:id', associacaoController.show);

router.post('/',authMiddleware, associacaoController.create);
router.put('/:id',authMiddleware, associacaoController.update);
router.delete('/:id',authMiddleware, associacaoController.delete);
module.exports = router;
