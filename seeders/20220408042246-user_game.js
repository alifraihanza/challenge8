'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_game', [
      {
        nama_pengguna: "dikaUYE",
        email: "alifraihanzaa@gmail.com",
        kata_sandi: bcrypt.hashSync('dikdik', 10),
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
    
        nama_pengguna: "paul",
        kata_sandi: bcrypt.hashSync('paul', 10),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
       
        nama_pengguna: "JONS",
        kata_sandi: bcrypt.hashSync('jons', 10),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        nama_pengguna: "ilham",
        kata_sandi:bcrypt.hashSync('jejen', 10),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        nama_pengguna: "queen",
        kata_sandi: bcrypt.hashSync('barbie', 10),
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_game', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
