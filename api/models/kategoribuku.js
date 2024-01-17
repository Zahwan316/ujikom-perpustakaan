const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategoribuku', {
    kategoriID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_kategori: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kategoribuku',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kategoribuku_pkey",
        unique: true,
        fields: [
          { name: "kategoriID" },
        ]
      },
    ]
  });
};
