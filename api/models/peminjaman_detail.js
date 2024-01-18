const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peminjaman_detail', {
    peminjaman_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    peminjaman_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    buku_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'peminjaman_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peminjaman_detail_pkey",
        unique: true,
        fields: [
          { name: "peminjaman_detail_id" },
        ]
      },
    ]
  });
};
