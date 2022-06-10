'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game_history.belongsTo(models.user_game, {foreignKey: 'id_pengguna', as: 'user_game'})
    }
  }
  user_game_history.init({
    id_pengguna: DataTypes.INTEGER,
    menang: DataTypes.INTEGER,
    kalah: DataTypes.INTEGER,
    tanggal_history: DataTypes.DATE,
    // foto: DataTypes.TEXT,
    video: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'user_game_history',
    modelName: 'user_game_history',
    underscored: true,
  });
  return user_game_history;
};