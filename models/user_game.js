'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game.hasMany(models.user_game_history, {foreignKey: 'id_pengguna', as: 'user_game_histoy'})
      user_game.hasOne(models.user_game_biodata, {foreignKey: 'id_pengguna', as: 'user_game_biodata'})
      user_game.belongsTo(models.roleusers, {foreignKey: 'role_id', as: 'role'})
    }
  }
  user_game.init({
    nama_pengguna: DataTypes.STRING,
    email: DataTypes.STRING,
    kata_sandi: DataTypes.STRING,
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    otp: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'user_game',
    modelName: 'user_game',
    underscored: true,
  });
  return user_game;
};