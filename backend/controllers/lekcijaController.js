const sequelize = require("../config/database");
const initModels = require("../models/init-models");
const sekcija = require("../models/sekcija");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const sekcijaId = req.query.sekcijaId;
  try {
    const query = {
      attributes: [
          "LEKCIJA_IME", 
          "LEKCIJA_OPIS", 
          "LEKCIJA_VIDEO"
        ],
      where: {}
    };

    if (sekcijaId) {
      query.where.SEKCIJA_ID = sekcijaId;
    }

    const results = await models.lekcija.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};