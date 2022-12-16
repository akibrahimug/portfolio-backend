const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Avarta extends Model {}
  Avarta.init(
    {
      avartaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pictureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Picture URL is required",
          },
          notEmpty: {
            msg: 'Please provide a picture URL"',
          },
        },
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "From date is required (A date when you first used this avarta)",
          },
          notEmpty: {
            msg: 'Please provide a date for "from"',
          },
        },
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End date is required (A date when you may want to update your avatar)",
          },
          notEmpty: {
            msg: 'Please provide a date for "to"',
          },
        },
      },
    },
    { sequelize }
  );
  Avarta.associate = (models) => {
    Avarta.belongsTo(models.User, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
  };
  return Avarta;
};
