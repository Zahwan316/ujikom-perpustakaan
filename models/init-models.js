var DataTypes = require("sequelize").DataTypes;
var _buku = require("./buku");
var _kategoribuku = require("./kategoribuku");
var _koleksipribadi = require("./koleksipribadi");
var _peminjaman = require("./peminjaman");
var _peminjaman_detail = require("./peminjaman_detail");
var _perpus = require("./perpus");
var _ulasanbuku = require("./ulasanbuku");
var _user = require("./user");

function initModels(sequelize) {
  var buku = _buku(sequelize, DataTypes);
  var kategoribuku = _kategoribuku(sequelize, DataTypes);
  var koleksipribadi = _koleksipribadi(sequelize, DataTypes);
  var peminjaman = _peminjaman(sequelize, DataTypes);
  var peminjaman_detail = _peminjaman_detail(sequelize, DataTypes);
  var perpus = _perpus(sequelize, DataTypes);
  var ulasanbuku = _ulasanbuku(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    buku,
    kategoribuku,
    koleksipribadi,
    peminjaman,
    peminjaman_detail,
    perpus,
    ulasanbuku,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
