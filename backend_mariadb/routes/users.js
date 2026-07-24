const express = require('express');
const router = express.Router();

const userServices = require('../services/userServices');
const AuthenticationJWT = require('../middlewares/AuthenticateWithJWT');

router.post('/register', async (req, res) => {
    try {
        /**
         * req.body must be
         * {
         * name: string,
         * eamil: string,
         * password: string
         * salutation: string
         * country: string
         * marketingPreferences: string[]
         * }
         */

        const newUserId = await userServices.createUser(req.body);
        res.json({
            newUserId
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // get JTW token
        const token = await userServices.loginUser(email, password);
        res.json({
            message: "Login successful",
            token
        })
    } catch (e) {
        res.status(401).json({
            "error": e.message
        })
    }
});

router.get('/me', [AuthenticationJWT], async (req, res) => {
    const userId = req.userId;
    const user = await userServices.getUserById(userId);
    res.json({
        ...user, password: null
    });
});

router.put('/me', [AuthenticationJWT], async (req, res) => {
    try {
        const userId = req.userId;
        await userServices.updateUser(userId, req.body);
        res.json({
            message: "User has been udpated."
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }



})

module.exports = router;