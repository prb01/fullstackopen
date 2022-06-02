const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: { type: DataTypes.TEXT, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "user" }
)

module.exports = User
