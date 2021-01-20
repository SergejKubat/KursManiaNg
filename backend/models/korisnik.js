const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('korisnik', {
    KORISNIK_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    KORISNIK_IME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    KORISNIK_EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    KORISNIK_AVATAR: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    KORISNIK_DATUM_REGISTRACIJE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    KORISNIK_LOZINKA: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    KORISNIK_IS_BLOCKED: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'korisnik',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KORISNIK_ID" },
        ]
      },
      {
        name: "KORISNIK_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "KORISNIK_ID" },
        ]
      },
    ]
  });
};
