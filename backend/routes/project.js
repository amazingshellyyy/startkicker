const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const mw = require('../middleware')

router.get('/all', ctrl.project.showAll)
router.get('/:id', ctrl.project.show);
router.post('/create', mw.auth.verify, ctrl.project.create);
router.put('/:id', ctrl.project.update);
router.delete('/:id', ctrl.project.destroy);



module.exports = router;