const express = require('express');
const router = express.Router();
const usersController = require('@controllers/admin/users');

router.get('/', usersController.index);
router.get('/create', usersController.create);
router.get('/delete/:userID', usersController.remove);
router.get('/edit/:userID', usersController.edit);
router.post('/update/:userID', usersController.update);
router.post('/store', usersController.store);

module.exports = router;
