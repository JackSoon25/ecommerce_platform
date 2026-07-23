const pool = require('../database');

async function getUserByEmail(email) {
    if (!email) {
        throw new Error("Invalid email");
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(sql, [email]);
    return rows[0] || null;
}

async function getUserById(id) {
    if (!id) {
        throw new Error("Invalid id");
    }

    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;

}

// use array destructuring to extract the various keys
// from object passed to createUser
// the object must be of the following shape
// - name; email, passwod, salutation, country, marketingPreference
async function createUser({ name, email, password, salutation, country, marketingPreferences }) {
    const connection = await pool.getConnection();
    try {
        
        await connection.beginTransaction();

        // 1. create user
        const createUserSql = `INSERT INTO users (
                    name, email, password, salutation, country) 
                    VALUE (?,?,?,?,?)`;

        const [userResult] = await connection.execute(createUserSql, [
            name, email, password, salutation, country
        ]);

        const newUserId =userResult.insertId;
        // 2. for each marketing preference the user has selected
        // insert into the user's marketing_preferences table as one row
        for (let marketing_perference_id of marketingPreferences) {
            const sql = `INSERT INTO user_marketing_preferences(user_id, preference_id)
                        VALUE (?, ?)`;
            await connection.execute(sql, [newUserId, marketing_perference_id]);
        }

        await connection.commit();
        return newUserId;
    } catch (e) {
        await connection.rollback();
        console.error(e);
        throw(e);
    } finally {
        await connection.release();
    }



    //   name VARCHAR(100) NOT NULL,
    //   email VARCHAR(100) NOT NULL UNIQUE,
    //   password VARCHAR(255) NOT NULL,
    //   salutation VARCHAR(10),
    //   country VARCHAR(50),
}

async function updateUser() {

}


module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser
}