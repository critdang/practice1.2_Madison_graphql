const userResolvers = require('./user');
const postResolvers = require('./post');
const commentResolvers = require('./comment');
const clientResolvers = require('./client');
module.exports = [userResolvers, postResolvers, commentResolvers,clientResolvers];
