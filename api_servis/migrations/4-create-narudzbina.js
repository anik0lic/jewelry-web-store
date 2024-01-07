'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbine', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vreme_narucivanja: {
        type: Sequelize.DATE,
        allowNull: false
      }, 
      status: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      adresa: {
          type: Sequelize.TEXT,
          allowNull: false
      }, 
      telefon: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      ime_prezime: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: { 
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbine');
  }
};