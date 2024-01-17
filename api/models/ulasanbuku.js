const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ulasanbuku', {
    ulasanID: {
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
    ulasan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ulasanbuku',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ulasanbuku_pkey",
        unique: true,
        fields: [
          { name: "ulasanID" },
        ]
      },
    ]
  });
};
