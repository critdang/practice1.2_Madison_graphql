const express = require('express');
const clientController =require('../controller/client.controller') ;
const {upload} = require('../../utils/helperFn')

const router = express.Router(); 

// router.route('/uploadImage/:email').post(userController.uploadImage);
// http://localhost:3301/api/users/uploadImage/1
router.get('/verify/:token',clientController.verifyClient);

module.exports = router;
