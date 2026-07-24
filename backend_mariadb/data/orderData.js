const pool = require('../database');


async function getOrdersByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
    return rows;
}

/**
 * @param {integer} userId Id of the user
 * @param {[
 * {
 *  product_id: integer,
 *  quantity: integer
 *  price: double 
 * }
 * ]} orderItems 
 */
async function createOrder(userId, orderItems) {
    // need to add orders and order item tables.  Need transaction
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // create the order
        let total = 0;
        for (let item of orderItems) {
            total += item.price * item.quantity;
        }

        const sql = `INSERT INTO orders (user_id, total) VALUES (?,?)`

        const [results] = await connection.execute(sql, [userId, total]);
        const newOrderId = results.insertId;

        // insert the order items
        for (let item of orderItems) {
            const sql = `INSERT INTO order_items
                    (order_id, product_id, quantity)
                    VALUES (?,?,?)`;
            await connection.execute(sql, [newOrderId, item.product_id, item.quantity]);
        }
        await connection.commit();
        return newOrderId;


    } catch (e) {
        await connection.rollback();
        console.error(e);
        throw e;

    } finally {
        await connection.release();

    }
}

async function getOrderDetails(orderId) {


}

async function updateOrderStatus(orderId, status) {


}


async function updateOrderSessionId(orderId, sessionId) {
    const sql = `UPDATE orders SET checkout_session_id = ? WHERE id = ?`;
    await pool.execute(sql, [sessionId, orderId]); 

}

module.exports = {
    getOrdersByUserId,
    createOrder,
    getOrderDetails,
    updateOrderStatus,
    updateOrderSessionId
}