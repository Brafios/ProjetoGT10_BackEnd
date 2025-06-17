

const express = require('express');
const router = express.router();
const associacaoController = require('../controllers/AssociationController')

router.get('/', associacaoController.list);
router.get('/:id', associacaoController.show);

router.post('/', associacaoController.create);
router.put('/:id', associacaoController.update);
router.delete('/:id', associacaoController.delete);
module.exports = router;
