'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proizvod extends Model {
    static associate({Kategorija, StavkaNarudzbine, ProizvodMaterijal}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "proizvod_id", as: "stavka"});
      this.hasMany(ProizvodMaterijal, {foreignKey: "proizvod_id", as: "materijal"});
    }
  }
  Proizvod.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }, 
    opis: {
        type: DataTypes.TEXT,
        allowNull: true
    }, 
    cena: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    kategorija_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proizvod',
    tableName: 'Proizvodi'
  });
  return Proizvod;
};