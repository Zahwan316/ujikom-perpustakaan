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
    tanggal_peminjaman: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tanggal_pengembalian: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    perpus_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    status_peminjaman: {
      type: DataTypes.INTEGER,
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
