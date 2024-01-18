const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('koleksipribadi', {
    koleksiID: {
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
    }
  }, {
    sequelize,
    tableName: 'koleksipribadi',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "koleksipribadi_pkey",
        unique: true,
        fields: [
          { name: "koleksiID" },
        ]
      },
    ]
  });
};
