const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const mw = require('../middleware')


router.get('/all/:projectId', ctrl.plan.showAll)
router.get('/:id', ctrl.plan.show);
router.post('/create', mw.auth.verify, ctrl.plan.create);
router.put('/:id', ctrl.plan.update);
router.delete('/:id', ctrl.plan.destroy);


module.exports = router;