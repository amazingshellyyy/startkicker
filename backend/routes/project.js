const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.project.show);
router.post('/create', ctrl.project.create);
router.put('/:id', ctrl.project.update);
router.delete('/:id', ctrl.project.destroy);



module.exports = router;