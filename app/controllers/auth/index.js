const authService = require('@services/authService');
const {roles} = require('@models/user/userRole');
const formValidator = require('@validators/index');
//----
exports.showLogin = async (req, res) => {

    res.newRender('auth/login', {layout: 'auth'})
};
// ----
exports.doLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await authService.login(email, password);
    if(!user){
        req.flash('errors', ['ایمیل یا نام کاربری اشتباه است'])
        return res.redirect('/auth/login');
    }
    req.session.user = user;
    const pathToRedirect = user.role === roles().ADMIN ? '/admin/dashboard' : '/' ;
    return res.redirect(pathToRedirect)
};
// ----
exports.showRegister = async (req, res) => {
    res.newRender('auth/register', {layout: 'auth'})
};
//----
exports.doRegister = async (req, res) => {
    const {email, password, password_confirmation} = req.body;
    const emptyFields = await formValidator.create(email, password);
    if (emptyFields.length > 0) {
        const newUserId = await authService.register(email, password)
            if(!newUserId){
                req.flash('errors', ['این ایمیل قبل ثبت شده است']);
                return res.redirect('/auth/register');
                }
    }else{
        req.flash('errors', ['ایمیل یا پسورد نمیتواند خالی باشد']);
        return res.redirect('/auth/register');
    }
    
    return res.redirect('/auth/login');

};
//----
exports.logout = async (req, res) => {
    req.session.destroy(error => {
        res.redirect('/auth/login')
    })
};