const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_user', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    user_ref_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ref_user',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "ref_user_pkey",
        unique: true,
        fields: [
          { name: "nama" },
        ]
      },
    ]
  });
};
