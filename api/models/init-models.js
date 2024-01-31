var DataTypes = require("sequelize").DataTypes;
var _buku = require("./buku");

function initModels(sequelize) {
  var buku = _buku(sequelize, DataTypes);


  return {
    buku,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
