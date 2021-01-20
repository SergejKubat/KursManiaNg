const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('autor', {
    AUTOR_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AUTOR_IME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    AUTOR_ZANIMANJE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AUTOR_OPIS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AUTOR_EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    AUTOR_SLIKA: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AUTOR_LOZINKA: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'autor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AUTOR_ID" },
        ]
      },
      {
        name: "AUTOR_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AUTOR_ID" },
        ]
      },
    ]
  });
};
