//----models
const userModel = require('@models/user');
const {roles} = require('@models/user/userRole');
//----services
const dateService = require('@services/dateService');


exports.index = async (req, res) =>{

    const users = await userModel.findAll();

    const peresentUser = await users.map(user =>{
        user.jalali_created_at = dateService.toPersianDate(user.created_at);
        return user;
    })
    res.adminRender('admin/users/index', {layout:'admin', users: peresentUser, helpers: {

        isRole: function(role, options){
            let roleName = "";
            switch(true){
                case role === roles().ADMIN: roleName +='ادمین';
                break;

                case role === roles().USER: roleName +='کاربر';
                break;

                case role === roles().WRITER: roleName +='نویسنده';
                break;
            }
            return roleName;
        }

    }});
}

exports.create = async (req, res) =>{

    res.adminRender('admin/users/create', {layout: 'admin'});
};

exports.store = async (req, res) => {

    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
   
    const insertId = await userModel.create(userData);

    if(insertId){
       res.redirect('/admin/users'); 
    };

};

exports.edit = async (req, res) => {

    const userID = req.params.userID;

    if(parseInt(userID) === 0) {
        res.redirect('/admin/users');
    }

    const user = await userModel.find(userID);
    res.adminRender('admin/users/edit', {layout: 'admin', user,userRole: roles(), helpers: {

        isuserAuthor: function (userID, options){
            return user.role === userID ? options.fn(this) : options.inverse(this);
        },

        isSelectedStatus: function (status, options){
            return user.role === status ? options.fn(this) : options.inverse(this);
        }
    }})
};

exports.update = async (req, res) => {

    const userID = req.params.userID;

    if(parseInt(userID) === 0) {
        res.redirect('/admin/users');
    }

    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    const result = await userModel.update(userID, userData);
    return res.redirect('/admin/users');
};

exports.remove = async (req, res) => {
    const userID = req.params.userID;
    if(parseInt(userID) === 0) {
        res.redirect('/admin/users');
    }
    const result = await userModel.delete(userID);
    res.redirect('/admin/users')
};