const express = require('express');
const router=express.Router();

const checkoutServices = require('../services/checkoutServices');
const AuthenticateJTW = require('../middlewares/AuthenticateWithJWT');

router.post('/', [AuthenticateJTW], async (req, res) => {
    const userId = req.userId;
    const order = await checkoutServices.checkout(userId);
    res.json(order);
});

module.exports = router;