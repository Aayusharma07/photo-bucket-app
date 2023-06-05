const express = require('express');
const router = express.Router();
const imageRoute = require('./image.route');
const userRoute = require('./user.route');

router.use('/images', imageRoute);
router.use('/user', userRoute);

module.exports = router;
