const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nama_lengkap: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    perpus_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
