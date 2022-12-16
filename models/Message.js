const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {}

  Message.init(
    {
      messageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Please provide a email",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Please provide a name",
          },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Message is required",
          },
          notEmpty: {
            msg: "Please provide a message",
          },
        },
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize }
  );

  return Message;
};
