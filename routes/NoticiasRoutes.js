const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/NoticiasController')

router.get('/', noticiasController.list);
router.get('/:id', noticiasController.show);

router.post('/', noticiasController.create);
router.put('/:id', noticiasController.update);
router.delete('/:id', noticiasController.delete);
module.exports = router;
