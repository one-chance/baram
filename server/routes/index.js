const express = require('express');
const error = require('./error');
const common = require('./common');
const user = require('./user');

const free = require('./Board/free');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use('/*', (req, res, next) => {
	res.setHeader("Expires", "-1");
	res.setHeader("Cache-Control", "must-revalidate, private");
	next();
});

router.use('/common', common);
router.use('/error', error);

router.use('/user', authMiddleware);
router.use('/user', user);

router.use('/board/free', free);

module.exports = router;