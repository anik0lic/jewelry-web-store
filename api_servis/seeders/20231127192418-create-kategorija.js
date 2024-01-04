'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorije',
    [
        {id:"1",naziv:"Prstenje"},
        {id:"2",naziv:"Ogrlice"},
        {id:"3",naziv:"Narukvice"},
        {id:"4",naziv:"Minđuše"}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategorija', null, {});
  }
};
