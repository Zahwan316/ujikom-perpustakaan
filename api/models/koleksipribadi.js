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
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'koleksipribadi',
    schema: 'public',
    timestamps: false,
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
