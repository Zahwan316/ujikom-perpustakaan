const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategoribuku_relasi', {
    kategoribukuID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bukuID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kategoriID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kategoribuku_relasi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kategoribuku_relasi_pkey",
        unique: true,
        fields: [
          { name: "kategoribukuID" },
        ]
      },
    ]
  });
};
