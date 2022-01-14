const db = require('@database/mysql');
const hashService = require('@services/hashService');

exports.find = async (userID) =>{
    const [rows,field] = await db.query(`
    SELECT u.*
    FROM users u
    WHERE u.id=?
    LIMIT 1
    `, [userID]);
    return rows.length > 0 ? rows[0] : false;
};


exports.findAll = async () =>{
    // const sqlColumns = columns.length > 0 ? columns.join(',') : '*';
    //
    const [rows,field] = await db.query(`
    SELECT *
    FROM users
    ORDER BY created_at DESC
    `);
    return rows;
};
exports.findByEmail = async (email) =>{
   
    const [rows] = await db.query(`
    SELECT *
    FROM users
    WHERE email=?
    LIMIT 1
    `, [email]);
    return rows.length > 0 ? rows[0] : null;
};

exports.create = async (userData) => {

    const hashedPassword = hashService.hashPassword(userData.password);
    const updatedUserData = {...userData,password: hashedPassword};
    
    const [result] = await db.query(`
    INSERT INTO users SET ?
    `, [updatedUserData]);
    return result.insertId;
};

exports.delete = async (userData) => {
    const [result] = await db.query(`DELETE FROM users WHERE id=? LIMIT 1`, [userData]);
    return result.affectedRows > 0 ;
}

exports.update = async (userID, updateFields) => {

    const [result] = await db.query(`UPDATE users SET ? WHERE id=? LIMIT 1`, [updateFields, userID]);
    return result.affectedRows > 0 ;
}

