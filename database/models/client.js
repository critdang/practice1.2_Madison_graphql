
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      age: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      countLogin: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
    },
  );

  Client.beforeCreate(async (client) => {
    client.password = await client.generatePasswordHash();
  });
  Client.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  Client.associate = function (models) {
    
  };
  return Client;
};