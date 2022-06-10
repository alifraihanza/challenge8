'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengguna: {
        type: Sequelize.INTEGER,
        references:{
          model: 'user_game',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      menang: {
        type: Sequelize.INTEGER
      },
      kalah: {
        type: Sequelize.INTEGER
      },
      tanggal_history: {
        type: Sequelize.DATE
      },
      // foto: {
      //   type: Sequelize.TEXT
      // },
      video: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_history');
  }
};