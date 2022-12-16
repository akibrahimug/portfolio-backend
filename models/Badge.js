const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Badge extends Model {}
  Badge.init(
    {
      badgeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      badgeTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Badge title is required",
          },
          notEmpty: {
            msg: "Please provide a badge title",
          },
        },
      },
      pictureUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Picture URL is required",
          },
          notEmpty: {
            msg: "Please provide a picture URL",
          },
        },
      },
    },
    { sequelize }
  );
  Badge.associate = (models) => {
    Badge.belongsTo(models.TechStack, {
      foreignKey: { fieldName: "techStackID", allowNull: false },
    });
    Badge.belongsTo(models.User, {
      foreignKey: { fieldName: "userID", allowNull: false },
    });
  };

  return Badge;
};
