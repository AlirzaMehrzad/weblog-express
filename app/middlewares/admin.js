const {roles} = require('@models/user/userRole');
module.exports = ((req, res, next) => {

    if(req.session.user.role !== roles().ADMIN){
        return res.redirect('/')
    }

    next();

});