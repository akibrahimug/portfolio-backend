const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Methodology extends Model {}
  Methodology.init(
    {
      methodologyID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      methodologyTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Methodology title is required",
          },
          notEmpty: {
            msg: "Please provide a methodology title",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Please provide a description",
          },
        },
      },
    },
    { sequelize }
  );
  Methodology.associate = (models) => {
    Methodology.belongsTo(models.User, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
  };
  return Methodology;
};
