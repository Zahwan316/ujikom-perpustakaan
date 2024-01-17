const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peminjaman', {
    peminjamanID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bukuID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tanggalPeminjaman: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tanggalPengembalian: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    statusPeminjaman: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'peminjaman',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peminjaman_pkey",
        unique: true,
        fields: [
          { name: "peminjamanID" },
        ]
      },
    ]
  });
};
