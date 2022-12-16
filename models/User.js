const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name is required",
          },
          notEmpty: {
            msg: "Please provide a value for First Name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name is required",
          },
          notEmpty: {
            msg: "Please provide a value for Last name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists",
        },
        validate: {
          notNull: {
            msg: "Email address is required",
          },
          notEmpty: {
            msg: "Please provide a value for Email",
          },
          isEmail: {
            msg: "Please provide a valid Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          if (val) {
            const hashedPassword = bcryptjs.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          }
        },
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Please provide a value for Password",
          },
        },
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    { sequelize }
  );
  User.associate = (models) => {
    User.hasMany(models.PersonalStatement, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Certification, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Experience, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Project, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Resume, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.TechStack, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Badge, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Avarta, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
    User.hasMany(models.Methodology, {
      foreignKey: {
        fieldName: "userID",
        allowNull: false,
      },
    });
  };
  return User;
};
