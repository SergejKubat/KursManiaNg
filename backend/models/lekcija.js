const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lekcija', {
    LEKCIJA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SEKCIJA_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LEKCIJA_IME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    LEKCIJA_OPIS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LEKCIJA_VIDEO: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lekcija',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LEKCIJA_ID" },
        ]
      },
      {
        name: "LEKCIJA_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LEKCIJA_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_7_FK",
        using: "BTREE",
        fields: [
          { name: "SEKCIJA_ID" },
        ]
      },
    ]
  });
};
