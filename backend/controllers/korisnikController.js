const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  try {
    const results = await models.korisnik.findAll({
      attributes: [
        "KORISNIK_IME",
        "KORISNIK_AVATAR",
        "KORISNIK_DATUM_REGISTRACIJE",
      ]
    });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};
