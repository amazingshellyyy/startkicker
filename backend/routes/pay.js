const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/createCustomer', ctrl.pay.createPaymentIntent);
router.post('/createPaymentIntent', ctrl.pay.createPaymentIntent);


module.exports = router;