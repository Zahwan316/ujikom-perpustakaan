var DataTypes = require("sequelize").DataTypes;
var _buku = require("./buku");
var _kategoribuku = require("./kategoribuku");
var _koleksipribadi = require("./koleksipribadi");
var _message = require("./message");
var _peminjaman = require("./peminjaman");
var _perpus = require("./perpus");
var _ref_peminjaman = require("./ref_peminjaman");
var _ref_user = require("./ref_user");
var _ulasanbuku = require("./ulasanbuku");
var _user = require("./user");

function initModels(sequelize) {
  var buku = _buku(sequelize, DataTypes);
  var kategoribuku = _kategoribuku(sequelize, DataTypes);
  var koleksipribadi = _koleksipribadi(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var peminjaman = _peminjaman(sequelize, DataTypes);
  var perpus = _perpus(sequelize, DataTypes);
  var ref_peminjaman = _ref_peminjaman(sequelize, DataTypes);
  var ref_user = _ref_user(sequelize, DataTypes);
  var ulasanbuku = _ulasanbuku(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    buku,
    kategoribuku,
    koleksipribadi,
    message,
    peminjaman,
    perpus,
    ref_peminjaman,
    ref_user,
    ulasanbuku,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
