const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_peminjaman', {
    ref_peminjaman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'ref_peminjaman',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "ref_peminjaman_pkey",
        unique: true,
        fields: [
          { name: "ref_peminjaman_id" },
        ]
      },
    ]
  });
};
