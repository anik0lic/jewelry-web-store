'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('proizvodmaterijal',
    [
        {id: "1",proizvod_id:1, materijal_id:1},
        {id: "2",proizvod_id:2, materijal_id:2}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProizvodMaterijal', null, {});
  }
};
