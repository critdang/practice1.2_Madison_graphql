const express = require('express');

const userRoutes = require('./user.routes');
const clientRoutes = require('./client.routes');
const router = express.Router(); // eslint-disable-line new-cap
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
module.exports = router;
