const {sequelize} = require('../../database/models');
const User = require('../../database/models').User;
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const helperFn = require('../../utils/helperFn');
const fs = require('fs');
const {promisify} = require('util');
const removeFile = promisify(fs.unlink);
// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
})
const uploadImage = async(req, res, next) => {
    const id = req.params.id
    const user = await User.findOne({
        where: {id}
    })
    if(req.file) {
        const img = await cloudinary.uploader.upload(req.file.path, {
            public_id: req.file.filename
        });
        user.avatar = img.url;
        await removeFile(req.file.path);
    }
    helperFn.returnSuccess(req,res,user);
}


module.exports= { uploadImage:uploadImage };
