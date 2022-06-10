'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.user_game, {
        foreignKey: "role_id",
        as: "role"
      })
    }
  }
  roleuser.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'roleusers',
    modelName: 'roleusers',
  });
  return roleuser;
};