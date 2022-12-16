const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class TechStack extends Model {}
  TechStack.init(
    {
      techStackID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      techTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tech title is required",
          },
          notEmpty: {
            msg: "Please provide a Technology title",
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
            msg: "Please provide a Picture URL",
          },
        },
      },
    },
    { sequelize }
  );
  TechStack.associate = (models) => {
    TechStack.hasMany(models.Badge, {
      foreignKey: { fieldName: "techStackID", allowNull: false },
    });

    TechStack.belongsTo(models.Certification, {
      foreignKey: { fieldName: "certificationID", allowNull: false },
    });
    TechStack.belongsTo(models.Experience, {
      foreignKey: { fieldName: "experienceID", allowNull: false },
    });
    TechStack.belongsTo(models.User, {
      foreignKey: { fieldName: "userID", allowNull: false },
    });
    TechStack.belongsToMany(models.Project, {
      through: "ProjectTechStack",
      foreignKey: { fieldName: "techStackID" },
    });
  };
  return TechStack;
};
