const express = require('express');
const router = express.Router();
const postController = require('@controllers/front/post');

router.get('/p/:post_slug', postController.showPost)

module.exports = router;
