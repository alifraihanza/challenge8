'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_game_history', [
      {
        
        id_pengguna: '1',
        menang: '2',
        kalah: '2',
        tanggal_history: '2022-03-10',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        id_pengguna: '2',
        menang: '3',
        kalah: '1',
        tanggal_history: '2022-03-10',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        id_pengguna: '3',
        menang: '0',
        kalah: '4',
        tanggal_history: '2022-03-10',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        id_pengguna: '4',
        menang: '1',
        kalah: '3',
        tanggal_history: '2022-03-10',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        id_pengguna: '5',
        menang: '4',
        kalah: '0',
        tanggal_history: '2022-03-10',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_game_history', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
