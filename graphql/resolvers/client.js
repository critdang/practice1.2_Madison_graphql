const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError,ApolloError } = require('apollo-server-express');
const helperFn = require('../../utils/helperFn')
const { Client } = require('../../database/models');
require('dotenv').config();
module.exports = {
  Mutation: {
    async registerClient(root, args, _) {
      try{
        const { email, password, firstName, lastName,phoneNumber,age } = args.input;
        const clientExist = await Client.findOne({where: {email}});
        if(clientExist) {
          return new ApolloError(process.env.EXIST_ACCOUNT,400);
        }
        await Client.create({ email, password,firstName, lastName,phoneNumber,age });
        const token = helperFn.generateToken({email},'3m');   
        helperFn.sendEmail(
          email,
          process.env.SUCCESS_EMAIL,
          process.env.SUCCESS_EMAIL_DES,
          process.env.SUCCESS_EMAIL_ENDPOINT,
          token,
        );
        return Client
      }catch(err) {
        console.log(err);
      }
    },

    async loginClient(root, { input }, context) {
      if(!input.email || !input.password) {
        return next(new AppError(process.env.PROVIDE,400))
      }
      const { email, password } = input;
      const client = await Client.findOne({ where: { email } });
      if(client.countLogin > 3 || !isActive) {
          return next(new AppError(process.env.DISABLED,400))
      };
      if (client && bcrypt.compareSync(password, client.password)) {
        const token = jwt.sign({ id: client.id }, 'mySecret', { expiresIn: '1d' });
        client.countLogin = 0;
        await client.save();
        return { ...client.toJSON(), token };
      }
      await client.increment('countLogin');
      await client.save();
      throw new AuthenticationError('Invalid credentials');
    },
    async updateClient(_, { input }, {client = null}) {
      try{
        if (!client) {
          throw new AuthenticationError('You must login to create a post');
        }
        const {firstName, lastName, phoneNumber, age} = input;
        const updateClient = await Client.findOne({
          where:{id:client.id},
          attributes: {exclude:['password']}
        });
        if(firstName)updateClient.firstName = input.firstName;
        if(lastName)updateClient.lastName = input.lastName;
        if(phoneNumber)updateClient.phoneNumber = input.phoneNumber;
        if(age)updateClient.age = age;
        await updateClient.save();
        return updateClient

      // helperFn.returnSuccess(req,res,updateUser);
      }catch(err) {
        console.log(err);
      }
    },
    async deleteClient(_, { input }, {client = null}) {
      try{
        if (!client) {
          throw new AuthenticationError('You must login to create a post');
        }
        const {id} = input;
        const deleteClient = await Client.findOne({where:{id:client.id}
        });
        await deleteClient.destroy();
        if(!deleteClient) {
            return next(new AppError(`Doesn't have User`,400));
        }
        return 'Deleted successfully!'
      }catch(err) {
        console.log(err);
      }
    }
  },
};
