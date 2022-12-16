const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Project extends Model {}
  Project.init(
    {
      projectID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Project title is required",
          },
          notEmpty: {
            msg: 'Please provide a Project title"',
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
            msg: 'Please provide a Picture URL"',
          },
        },
      },
      projectDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Project description is required",
          },
          notEmpty: {
            msg: 'Please provide a Project description"',
          },
        },
      },
      liveSiteUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Live site URL is required",
          },
          notEmpty: {
            msg: 'Please provide a Live site URL"',
          },
        },
      },
      githubUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Github URL is required",
          },
          notEmpty: {
            msg: 'Please provide a Github URL"',
          },
        },
      },
    },
    { sequelize }
  );
  Project.associate = (models) => {
    Project.belongsToMany(models.TechStack, {
      through: "ProjectTechStack",
      foreignKey: { fieldName: "projectID" },
    });
  };
  return Project;
};
