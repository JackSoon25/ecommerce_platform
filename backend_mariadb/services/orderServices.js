const orderData = require('../data/orderData');

async function createOrder(userId, orderItems) {
    return await orderData.createOrder(userId, orderItems);
}

async function updateOrderSessionId(orderId, sessionId) {
    return await orderData.updateOrderSessionId(orderId, sessionId);
}
module.exports = {
    createOrder,
    updateOrderSessionId
}