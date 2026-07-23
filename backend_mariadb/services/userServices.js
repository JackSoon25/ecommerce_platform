const userData = require('../data/userData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUserByEmail(email) {
    return await userData.getUserByEmail(email);
}

async function getUserById(id) {
    return await userData.getUserById(id);
}

/**
 * 
 * @param {{
 *  name: string,
 * eamil: string,
 * password: string
 * salutation: string
 * country: string
 * marketingPreferences: string[]
 * }} user 
 * @returns {Promise<object>}
 */
async function createUser(user) {

    const hashedPassword  = await bcrypt.hash(user.password, 10); 

    return await userData.createUser({...user, password:hashedPassword});
}

async function loginUser(email, password) {
    // 1. get the user by their eamil
    const user = await userData.getUserByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // 2. check if the password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // 3. if password is valid then create the JWT
    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    // 4. return JWT
    return token;
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    loginUser
}