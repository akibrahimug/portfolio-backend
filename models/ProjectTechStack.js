const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProjectTechStack extends Model {}
  ProjectTechStack.init(
    {
      projectTechStackID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false, sequelize }
  );
  return ProjectTechStack;
};
