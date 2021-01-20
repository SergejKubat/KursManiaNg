const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategorija', {
    KATEGORIJA_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    KATEGORIJA_NAZIV: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kategorija',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KATEGORIJA_ID" },
        ]
      },
      {
        name: "KATEGORIJA_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KATEGORIJA_ID" },
        ]
      },
    ]
  });
};
