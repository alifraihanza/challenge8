'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const role = [
      {
        name: 'ADMIN',
        description: 'Can View All Data Privilege',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'USER',
        description: 'Can View Her/His Data Privilege',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    queryInterface.bulkInsert('roleusers', role, {} );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
