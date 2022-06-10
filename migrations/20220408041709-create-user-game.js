'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_pengguna: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      kata_sandi: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roleusers",
          key: "id"
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('user_game');
  }
};
