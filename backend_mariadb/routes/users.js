const express = require('express');
const router = express.Router();

const userServices = require('../services/userServices');

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
    try{
        const {email, password} = req.body;
        // get JTW token
        const token = await userServices.loginUser(email, password);
        res.json({
            message: "Login successful",
            token
        })
    }catch(e) {
        res.status(401).json({
            "error": e.message
        })
    }
});

router.get('/me', async (req, res) => {
    res.json({ message: "Getting the profile of the current logged-in user" });
});


module.exports = router;