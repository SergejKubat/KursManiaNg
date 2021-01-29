const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  try {
    const results = await models.korisnik.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.getById = async (req, res, next) => {
  const korisnikId = req.params.korisnikId;
  try {
    const result = await models.korisnik.findOne({
      where: { KORISNIK_ID: korisnikId }
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.logIn = async (req, res, next) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  try {
    const result = await models.korisnik.findOne({
      where: { 
        KORISNIK_EMAIL: email,
        KORISNIK_LOZINKA: password
      }
    });
    console.log(result);
  } catch (error) {
    res.status(404).send();
  }
}

exports.registration = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
}