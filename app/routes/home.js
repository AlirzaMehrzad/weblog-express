const express = require('express');
const router = express.Router();
const homeController = ('@controllers/front/home');

router.get('/', homeController.index);

module.exports = router;
