'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('proizvodi',
    [
        {id:"1",naziv:"Srebrni Prsten", opis:"lep prsten", cena: 100000, kategorija_id:1},
        {id:"2",naziv:"Zlatna Ogrlica", opis:"zlatna", cena: 250000, kategorija_id:2}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proizvod', null, {});
  }
};
