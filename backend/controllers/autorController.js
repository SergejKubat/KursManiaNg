const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  try {
    const results = await models.autor.findAll({
      attributes: ["AUTOR_ID", "AUTOR_IME", "AUTOR_ZANIMANJE", "AUTOR_OPIS", "AUTOR_SLIKA"],
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.getById = async (req, res, next) => {
  const autorId = req.params.autorId;
  try {
    const result = await models.autor.findOne({
      attributes: ["AUTOR_ID", "AUTOR_IME", "AUTOR_ZANIMANJE", "AUTOR_OPIS", "AUTOR_SLIKA"],
      where: { AUTOR_ID: autorId }
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};