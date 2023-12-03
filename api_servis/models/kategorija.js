'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
    static associate({Proizvod}) {
      this.hasMany(Proizvod, {foreignKey: "kategorija_id", as: "kategorija"});
    }
  }
  Kategorija.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'Kategorija',
    tableName: 'Kategorije'
  });
  return Kategorija;
};