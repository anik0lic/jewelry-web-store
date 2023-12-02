'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {

    static associate({StavkaNarudzbine}) {
      this.hasMany(StavkaNarudzbine, {foreignKey: "narudzbina_id", as: "stavke"});
    }
  }
  Narudzbina.init({
    vreme_narucivanja: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresa: {
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    telefon: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ime_prezime: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Narudzbina',
    tableName: 'Narudzbine'
  });
  return Narudzbina;
};