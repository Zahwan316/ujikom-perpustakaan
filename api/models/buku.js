const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buku', {
    bukuID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    judul: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    penulis: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    penerbit: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tahun_terbit: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'buku',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "buku_pkey",
        unique: true,
        fields: [
          { name: "bukuID" },
        ]
      },
    ]
  });
};
