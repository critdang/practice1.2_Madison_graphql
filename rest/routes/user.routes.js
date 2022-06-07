const express = require('express');
const userController =require('../controller/user.controller') ;
const {upload} = require('../../utils/helperFn')

const router = express.Router(); 

// router.route('/uploadImage/:email').post(userController.uploadImage);
// http://localhost:3301/api/users/uploadImage/1
router.post('/uploadImage/:id',upload.single('image'),userController.uploadImage);

module.exports = router;
