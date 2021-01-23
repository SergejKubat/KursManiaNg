const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const kursId = req.query.kursId;
  try {
    const query = {
      attributes: [
        "KURS_ID",
        "KORISNIK_ID",
        "OCENA_VREDNOST",
        "OCENA_KOMENTAR",
      ],
      where: {}
    };

    if (kursId) {
      query.where.KURS_ID = kursId;
    }

    const results = await models.ocena.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};