const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Experience extends Model {}
  Experience.init(
    {
      experienceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company is required",
          },
          notEmpty: {
            msg: "Please provide a company",
          },
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Position is required",
          },
          notEmpty: {
            msg: "Please provide a position",
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start date is required",
          },
          notEmpty: {
            msg: "Please provide a start date",
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End date is required",
          },
          notEmpty: {
            msg: "Please provide a end date",
          },
        },
      },
      description: {
        type: DataTypes.TEXT("long"),
        unique: {
          msg: "The experience you entered already exists",
        },
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
  Experience.associate = (models) => {
    Experience.hasMany(models.TechStack, {
      foreignKey: { fieldName: "experienceID", allowNull: false },
    });
    Experience.belongsTo(models.User, {
      foreignKey: { fieldName: "userID", allowNull: false },
    });
  };
  return Experience;
};
