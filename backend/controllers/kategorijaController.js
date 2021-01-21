const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  try {
    const results = await models.kategorija.findAll({
      attributes: ["KATEGORIJA_NAZIV", "KATEGORIJA_SLIKA"]
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.getById = async (req, res, next) => {
  const kategorijaId = req.params.kategorijaId;
  try {
    const result = await models.kategorija.findOne({
      attributes: ["KATEGORIJA_NAZIV", "KATEGORIJA_SLIKA"],
      where: { KATEGORIJA_ID: kategorijaId }
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};