const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sekcija', {
    SEKCIJA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    KURS_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'kurs',
        key: 'KURS_ID'
      }
    },
    SEKCIJA_NASLOV: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sekcija',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SEKCIJA_ID" },
        ]
      },
      {
        name: "SEKCIJA_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SEKCIJA_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_6_FK",
        using: "BTREE",
        fields: [
          { name: "KURS_ID" },
        ]
      },
    ]
  });
};
