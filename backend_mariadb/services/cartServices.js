const cartData = require('../data/cartData');

async function getCartContents(userId) {
    return await cartData.getCartContents(userId);
}

async function updateCart(userId, cartItems) {
    return await cartData.updateCart(userId, cartItems);

}

module.exports = {
    getCartContents, 
    updateCart
}