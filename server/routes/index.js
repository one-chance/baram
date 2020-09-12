const express = require('express');
const common = require('./common');
const user = require('./user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use('/*', (req, res, next) => {
	res.setHeader("Expires", "-1");
	res.setHeader("Cache-Control", "must-revalidate, private");
	next();
});

router.use('/common', common);

router.use('/user', authMiddleware);
router.use('/user', user);

module.exports = router;