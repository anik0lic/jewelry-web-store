'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materijal extends Model {

    static associate({Proizvod}) {
      this.belongsToMany(Proizvod, {foreignKey: "materijal_id", as: "materijal", through:"ProizvodMaterijal"});
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