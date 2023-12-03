'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materijal extends Model {
    static associate({ProizvodMaterijal}) {
      this.hasMany(ProizvodMaterijal, {foreignKey: "materijal_id", as: "proizvod"});
    }
  }
  Materijal.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'Materijal',
    tableName: 'Materijali'
  });
  return Materijal;
};