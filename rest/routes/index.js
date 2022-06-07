const express = require('express');

const userRoutes = require('./user.routes');

const router = express.Router(); // eslint-disable-line new-cap
router.use('/users', userRoutes);

module.exports = router;
