const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('perpus', {
    perpus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_perpus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'perpus',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "perpus_pkey",
        unique: true,
        fields: [
          { name: "perpus_id" },
        ]
      },
    ]
  });
};
