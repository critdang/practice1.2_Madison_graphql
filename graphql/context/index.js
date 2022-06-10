const { User } = require('../../database/models');
const { Client } = require('../../database/models');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express')

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, 'mySecret');//get id and put in object
    const client = await Client.findByPk(id);
    return client;
  } catch (error) {
    console.log(error);
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';
  //  const client = await verifyToken(token)
  let client = await verifyToken(token) || null ;
  return { client };
};
