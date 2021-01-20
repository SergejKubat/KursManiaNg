const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kurs', {
    KURS_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AUTOR_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    KATEGORIJA_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    KURS_IME: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    KURS_OPIS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DATUM_POSLEDNJE_PROMENE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    KURS_JEZIK: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    KURS_CENA: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    KURS_SLIKA: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    KURS_JAVAN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kurs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KURS_ID" },
        ]
      },
      {
        name: "KURS_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KURS_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_3_FK",
        using: "BTREE",
        fields: [
          { name: "AUTOR_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_5_FK",
        using: "BTREE",
        fields: [
          { name: "KATEGORIJA_ID" },
        ]
      },
    ]
  });
};
