'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('materijali',
    [
        {id:"1",naziv:"Srebro"},
        {id:"2",naziv:"Zlato"}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materijal', null, {});
  }
};
