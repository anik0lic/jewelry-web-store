'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('narudzbine',
    [
        {id: "1",vreme_narucivanja:"2023-12-03 13:08:22", status:"Novo", adresa:"Bulevar Oslobodjenja 12", telefon:"069123456", ime_prezime:"Milica Grujic", cena:"100000"},
        {id: "2",vreme_narucivanja:"2023-12-02 10:28:32", status:"Prihvaceno", adresa:"Knez Mihailova 6/6", telefon:"0638943211", ime_prezime:"Ljubica Srdanovic", cena:"250000"},
        {id: "3",vreme_narucivanja:"2023-12-01 18:41:10", status:"Prihvaceno", adresa:"Kralja Milana 12/2", telefon:"061287482", ime_prezime:"Kristina Rakocevic", cena:"500000"}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Narudzbina', null, {});
  }
};
