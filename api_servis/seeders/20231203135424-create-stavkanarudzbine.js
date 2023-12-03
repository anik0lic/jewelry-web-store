'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stavkenarudzbina',
    [
        {id: "1",komada:1, narudzbina_id:1, proizvod_id:1},
        {id: "2",komada:1, narudzbina_id:1, proizvod_id:2},
        {id: "3",komada:1, narudzbina_id:2, proizvod_id:1},
        {id: "4",komada:2, narudzbina_id:3, proizvod_id:1}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StavkaNarudzbine', null, {});
  }
};
