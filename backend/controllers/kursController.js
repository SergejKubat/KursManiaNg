const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const autorId = req.query.autorId;
  const kategorijaId = req.query.kategorijaId;
  try {
    const query = {
      where: { KURS_JAVAN: 1 }
    };

    if (autorId) {
      query.where.AUTOR_ID = autorId;
    }

    if (kategorijaId) {
      query.where.KATEGORIJA_ID = kategorijaId;
    }

    const results = await models.kurs.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.getById = async (req, res, next) => {
  const kursId = req.params.kursId;
  try {
    const result = await models.kurs.findOne({
      where: { KURS_ID: kursId, KURS_JAVAN: 1 }
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};