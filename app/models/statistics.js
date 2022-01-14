const db = require('@database/mysql');

// =======
exports.totalUsers = async () =>{
    const [result] = await db.query('SELECT COUNT(id) as totalUsers FROM users');
    return result[0].totalUsers;
}

exports.totlaComments = async () =>{
    const [result] = await db.query('SELECT COUNT(id) as totlaComments FROM comments');
    return result[0].totlaComments;
};

exports.totalPosts = async () =>{
    const [result] = await db.query('SELECT COUNT(id) as totalPosts FROM posts');
    return result[0].totalPosts;
};

exports.totalViews = async () =>{
    const [result] = await db.query('SELECT SUM(views) as totalViews FROM posts');
    return result[0].totalViews;
};