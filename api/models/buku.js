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
    perpus_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_terbit: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sinopsis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isi_buku: {
      type: DataTypes.STRING,
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
