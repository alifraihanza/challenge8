'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game_biodata.belongsTo(models.user_game, {foreignKey: 'id_pengguna', as: 'user_game'})
    }
  }
  user_game_biodata.init({
    id_pengguna: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    umur: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'user_game_biodata',
    modelName: 'user_game_biodata',
    underscored: true,
  });
  return user_game_biodata;
};