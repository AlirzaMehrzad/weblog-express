const authService = require('@services/authService');
const {roles} = require('@models/user/userRole');
const formValidator = require('@validators/auth');
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
    const emptyFields = await formValidator.create(email, password, password_confirmation);
    
    //----validation
    if (emptyFields.length > 0) {
        req.flash('errors', ['ایمیل یا پسورد نمیتواند خالی باشد']);
        return res.redirect('/auth/register');
    }
    else{
        
        const confirmPassword = await authService.findOneEmail(email);
        
            if (confirmPassword) {
                req.flash('errors', ['ایمیل قبلا ثبت نام شده']);
                return res.redirect('/auth/register');
            }

            if(password !== password_confirmation) {
                req.flash('errors', ['پسورد ها یکسان نیست']);
                return res.redirect('/auth/register');
                }
        
            if(password.length < 8){
                req.flash('errors', ['طول کلمه عبور نباید کمتر از 8 کاراکتر باشد']);
                return res.redirect('/auth/register');
            }
        }
        //----do register
        await authService.register(email, password);
        res.redirect('/auth/login');

};
//----
exports.logout = async (req, res) => {
    req.session.destroy(error => {
        res.redirect('/auth/login')
    })
};