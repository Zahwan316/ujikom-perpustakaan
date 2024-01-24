var DataTypes = require("sequelize").DataTypes;
var _ref_user = require("./ref_user");

function initModels(sequelize) {
  var ref_user = _ref_user(sequelize, DataTypes);


  return {
    ref_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
