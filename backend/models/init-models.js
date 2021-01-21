var DataTypes = require("sequelize").DataTypes;
var _autor = require("./autor");
var _evidencija = require("./evidencija");
var _kategorija = require("./kategorija");
var _korisnik = require("./korisnik");
var _kurs = require("./kurs");
var _lekcija = require("./lekcija");
var _ocena = require("./ocena");
var _sekcija = require("./sekcija");

function initModels(sequelize) {
  var autor = _autor(sequelize, DataTypes);
  var evidencija = _evidencija(sequelize, DataTypes);
  var kategorija = _kategorija(sequelize, DataTypes);
  var korisnik = _korisnik(sequelize, DataTypes);
  var kurs = _kurs(sequelize, DataTypes);
  var lekcija = _lekcija(sequelize, DataTypes);
  var ocena = _ocena(sequelize, DataTypes);
  var sekcija = _sekcija(sequelize, DataTypes);

  evidencija.belongsTo(korisnik, { foreignKey: "KORISNIK_ID"});
  korisnik.hasMany(evidencija, { foreignKey: "KORISNIK_ID"});
  evidencija.belongsTo(kurs, { foreignKey: "KURS_ID"});
  kurs.hasMany(evidencija, { foreignKey: "KURS_ID"});
  kurs.belongsTo(autor, { foreignKey: "AUTOR_ID"});
  autor.hasMany(kurs, { foreignKey: "AUTOR_ID"});
  kurs.belongsTo(kategorija, { foreignKey: "KATEGORIJA_ID"});
  kategorija.hasMany(kurs, { foreignKey: "KATEGORIJA_ID"});
  lekcija.belongsTo(sekcija, { foreignKey: "SEKCIJA_ID"});
  sekcija.hasMany(lekcija, { foreignKey: "SEKCIJA_ID"});
  ocena.belongsTo(kurs, { foreignKey: "KURS_ID"});
  kurs.hasMany(ocena, { foreignKey: "KURS_ID"});
  ocena.belongsTo(korisnik, { foreignKey: "KORISNIK_ID"});
  korisnik.hasMany(ocena, { foreignKey: "KORISNIK_ID"});
  sekcija.belongsTo(kurs, { foreignKey: "KURS_ID"});
  kurs.hasMany(sekcija, { foreignKey: "KURS_ID"});

  return {
    autor,
    evidencija,
    kategorija,
    korisnik,
    kurs,
    lekcija,
    ocena,
    sekcija,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
