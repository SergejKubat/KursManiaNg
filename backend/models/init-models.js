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
