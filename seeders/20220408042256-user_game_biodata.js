'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_game_biodata', [
      {
        
        id_pengguna: "1",
        nama: "FARROS FAUZAN",
        tanggal_lahir: "2000-03-14",
        umur: "22",
        jenis_kelamin: "Laki-laki",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
       
        id_pengguna: "2",
        nama: "WAHYU JONORI",
        tanggal_lahir: "1997-05-19",
        umur: "24",
        jenis_kelamin: "Laki-laki",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
      
        id_pengguna: "3",
        nama: "HARDIANSYAH",
        tanggal_lahir: "1999-07-1",
        umur: "23",
        jenis_kelamin: "Laki-laki",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
      
        id_pengguna: "4",
        nama: "ILHAM FAJAR",
        tanggal_lahir: "2000-02-9",
        umur: "23",
        jenis_kelamin: "Laki-laki",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        
        id_pengguna: "5",
        nama: "KIKI SAPUTRI",
        tanggal_lahir: "2002-02-2",
        umur: "20",
        jenis_kelamin: "Perempuan",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_game_biodata', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
