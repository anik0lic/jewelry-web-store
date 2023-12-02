'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {

    static associate({Proizvod, Narudzbina}) {
      this.belongsTo(Proizvod, {foreignKey: "proizvod_id", as: "proizvod"});
      this.belongsTo(Narudzbina, {foreignKey: "narudzbina_id", as: "narudzbina"});
    }
  }
  StavkaNarudzbine.init({
    komada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    narudzbina_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proizvod_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
    tableName: 'StavkeNarudzbina'
  });
  return StavkaNarudzbine;
};