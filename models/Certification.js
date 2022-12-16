const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Certification extends Model {}
  Certification.init(
    {
      certificationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      certificationTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Certification title is required",
          },
          notEmpty: {
            msg: "Please provide a certification title",
          },
        },
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "School is required",
          },
          notEmpty: {
            msg: "Please provide a school",
          },
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
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
        type: DataTypes.DATEONLY,
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
  Certification.associate = (models) => {
    Certification.hasMany(models.TechStack, {
      foreignKey: { fieldName: "certificationID", allowNull: false },
    });
    Certification.belongsTo(models.User, {
      foreignKey: { fieldName: "userID", allowNull: false },
    });
  };
  return Certification;
};
