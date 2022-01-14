const userModel = require('@models/user');
const hashService = require('@services/hashService');
const {roles} = require('@models/user/userRole');

exports.login = async (email, plainPassword) => {

    const user = await userModel.findByEmail(email);
    if(!user){
       return false
    }
    const {password} = user;
    return hashService.compairPassword(plainPassword, password) ? user : null;
}

exports.register = async (email, password) => {
    const repeatEmail =  await userModel.findByEmail(email);
    if(!repeatEmail){
        let insertId = await userModel.create({
            full_name: 'کاربر ناشناس',
            email,
            password,
            role:roles().USER
        });
        return insertId;
    }
    return insertId = 0;
};

exports.password_confirmation = async (password) => {

}