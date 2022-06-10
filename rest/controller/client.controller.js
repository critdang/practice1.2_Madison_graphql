const Client = require('../../database/models').Client;
const { restart } = require('nodemon');
const catchAsync = require('../../utils/errorHandle/catchAsync');
const helperFn = require('../../utils/helperFn');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/errorHandle/appError')
require('dotenv').config();

const verifyClient = catchAsync(async(req, res,next) => {
    const token = req.params.token;
     // verify makes sure that the token hasn't expired and has been issued by us
    try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const client = await Client.findOne({
        attribute: ['id','isActive'],
        where: {
            email : decodedToken.email 
        }
    });
    if(!client) {
        return next(new AppError(process.env.EMAIL_NOT_AVA,401));
    }
    // client.isActive = true;
    client.set({isActive: true});
    await client.save();
    helperFn.returnSuccess(req, res, process.env.SUCCESS_VERIFY);
    }catch (err) {
        if(err.name ==='TokenExpiredError')
        return next(new AppError(process.env.TOKEN_EXPIRED,401));
        console.log(err)
    }
})

module.exports = {
    verifyClient:verifyClient
}