const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evidencija', {
    EVIDANCIJA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    KORISNIK_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    KURS_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EVIDENCIJA_DATUM: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'evidencija',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EVIDANCIJA_ID" },
        ]
      },
      {
        name: "EVIDENCIJA_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EVIDANCIJA_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_1_FK",
        using: "BTREE",
        fields: [
          { name: "KORISNIK_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_2_FK",
        using: "BTREE",
        fields: [
          { name: "KURS_ID" },
        ]
      },
    ]
  });
};
