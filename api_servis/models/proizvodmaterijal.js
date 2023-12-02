'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProizvodMaterijal extends Model {

    static associate({Proizvod, Materijal}) {
      this.belongsTo(Proizvod, {foreignKey: "proizvod_id", as: "proizvod"});
      this.belongsTo(Materijal, {foreignKey: "materijal_id", as: "materijal"});
    }
  }
  ProizvodMaterijal.init({
    proizvod_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    materijal_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ProizvodMaterijal',
    tableName: 'ProizvodMaterijal'
  });
  return ProizvodMaterijal;
};