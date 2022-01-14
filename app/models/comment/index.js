const db = require('@database/mysql');
const commentStatus = require('./commentStatus')

exports.find = async (postID) =>{
    const [rows,field] = await db.query(`
    SELECT p.*,u.full_name
    FROM posts p 
    JOIN users u ON p.author_id=u.id
    WHERE p.id=? LIMIT 1
    `, [postID]);
    return rows.length > 0 ? rows[0] : false;
};

exports.findAll = async () =>{
    const [rows,field] = await db.query(`
    SELECT c.*,p.title
    FROM comments c
    JOIN posts p ON c.post_id=p.id
    ORDER BY c.created_at DESC
    `);
    return rows;
};

exports.create = async (postData) => {
    const [result] = await db.query(`INSERT INTO posts SET ?`, [postData]);
    console.log(result);
    return result.insertId;
};

exports.update = async (postID, updateFields) => {
    const result = await db.query(`UPDATE posts SET ? WHERE id=? LIMIT 1`, [updateFields, postID]);
    return result.affectedRows > 0;
};

exports.approve = async (commentID) =>{
    const result = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentStatus.APPROVED, commentID]);
    return result.affectedRows > 0;
}

exports.reject = async (commentID) =>{
    const result = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentStatus.REJECTED, commentID]);
    return result.affectedRows > 0;
};

exports.delete = async (commentID) => {
    const [result] = await db.query(`DELETE FROM comments WHERE id=? LIMIT 1`, [commentID]);
    return result.affectedRows > 0;
};