const sequelize = require("../config/database");
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