const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');
const helperFn = require('../../utils/helperFn')
const { User } = require('../../database/models');

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { email, password, firstName, lastName,phoneNumber,age,avatar } = args.input;
      return User.create({ email, password,firstName, lastName,phoneNumber,age,avatar });
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'mySecret', { expiresIn: '1d' });
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },
    async update(_, { input }, {user = null}) {
      try{
        if (!user) {
          throw new AuthenticationError('You must login to create a post');
        }
        const {firstName, lastName, phoneNumber, age} = input;
        const updateUser = await User.findOne({
          where:{id:user.id},
          attributes: {exclude:['password']}
        });
        console.log(updateUser)
        if(firstName)updateUser.firstName = input.firstName;
        if(lastName)updateUser.lastName = input.lastName;
        if(phoneNumber)updateUser.phoneNumber = input.phoneNumber;
        if(age)updateUser.age = age;
        await updateUser.save();
        return updateUser

      // helperFn.returnSuccess(req,res,updateUser);
      }catch(err) {
        console.log(err);
      }
    },
    async delete(_, { input }, {user = null}) {
      try{
        if (!user) {
          throw new AuthenticationError('You must login to create a post');
        }
        const {id} = input;
        console.log('input',id)
        const deleteUser = await User.findOne({where:{id:user.id}
        });
        await deleteUser.destroy();
        if(!deleteUser) {
            return next(new AppError(`Doesn't have User`,400));
        }
        return 'Deleted successfully!'
      }catch(err) {
        console.log(err);
      }
    },
    // async verifyClient(_, { input }, {user = null}) {
    //   try{
    //     if (!user) {
    //       throw new AuthenticationError('You must login to create a post');
    //     }
    //     const {id} = input;
    //     console.log('input',id)
    //     const deleteUser = await User.findOne({where:{id:user.id}
    //     });
    //     await deleteUser.destroy();
    //     if(!deleteUser) {
    //         return next(new AppError(`Doesn't have User`,400));
    //     }
    //     return 'Deleted successfully!'
    //   }catch(err) {
    //     console.log(err);
    //   }
    // }
  },
};
