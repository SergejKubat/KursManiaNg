const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ocena', {
    OCENA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    KURS_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OCENA_VREDNOST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OCENA_KOMENTAR: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ocena',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OCENA_ID" },
        ]
      },
      {
        name: "OCENA_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OCENA_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_4_FK",
        using: "BTREE",
        fields: [
          { name: "KURS_ID" },
        ]
      },
    ]
  });
};
