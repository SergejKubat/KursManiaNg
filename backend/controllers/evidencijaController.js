const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const kursId = req.query.kursId;
  const korisnikId = req.query.korisnikId;
  try {
    const query = {
      where: {}
    };

    if (kursId) {
      query.where.KURS_ID = kursId;
    }

    if (korisnikId) {
      query.where.KORISNIK_ID = korisnikId;
    }

    const results = await models.evidencija.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};