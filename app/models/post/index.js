const db = require('@database/mysql');

exports.find = async (postID) =>{
    const [rows,field] = await db.query(`
    SELECT p.*,u.full_name
    FROM posts p 
    JOIN users u ON p.author_id=u.id
    WHERE p.id=? LIMIT 1
    `, [postID]);
    return rows.length > 0 ? rows[0] : false;
};

exports.findAll = async (page=1, perPage=10) =>{
    const offset = (page-1) * perPage;
    const [rows,field] = await db.query(`
    SELECT p.*,u.full_name
    FROM posts p 
    LEFT JOIN users u ON  p.author_id=u.id
    ORDER BY p.created_at DESC
    LIMIT ${offset},${perPage}
    `);
    return rows;
};

exports.count = async () =>{
    const [rows,field] = await db.query(`
        SELECT COUNT(id) as postsCount FROM posts
    `);
    return rows[0].postsCount;
};

exports.create = async (postData) => {
    const [result] = await db.query(`INSERT INTO posts SET ?`, [postData]);
    return result.insertId;
};

exports.delete = async (postID) => {
    const [result] = await db.query(`DELETE FROM posts WHERE id=? LIMIT 1`, [postID]);
    return result.affectedRows > 0;
};

exports.update = async (postID, updateFields) => {
    const result = await db.query(`UPDATE posts SET ? WHERE id=? LIMIT 1`, [updateFields, postID]);
    return result.affectedRows > 0;
};

exports.findBySlug = async (postSlug) =>{
    const [rows] = await db.query(`SELECT * FROM posts WHERE slug=? LIMIT 1 `, [postSlug]);
    return rows[0];
}
