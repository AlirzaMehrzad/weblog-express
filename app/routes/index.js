const adminRouter = require('./admin');
const authRouter = require('./auth');

const auth = require('@middlewares/auth');
const guest = require('@middlewares/guest');
const admin = require('@middlewares/admin');

const authcontroller = require('@controllers/auth');
const homeController = require('@controllers/front/home');

module.exports = app => {
    app.use('/admin',[auth, admin], adminRouter);
    app.use('/auth',[guest], authRouter);
    app.get('/logout', authcontroller.logout);
    app.get('/', homeController.index);
};
