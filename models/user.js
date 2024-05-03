const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      authSource: {
        type: DataTypes.ENUM("Normal", "Google", "Facebook"),
        defaultValue: "Normal",
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastActive: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      termsAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      defaultScope: {
        where: {
          archive: false,
        },
      },
      timestamps: true,
    }
  );
  User.beforeCreate((user) => {
    user.password = user.password
      ? bcrypt.hashSync(user.dataValues.password, bcrypt.genSaltSync(10))
      : null;
  });
  User.associate = (model) => {
    User.hasMany(model.Posts, {
      as: "posts",
      foreignKey: "userId",
    });
  };
  return User;
};
