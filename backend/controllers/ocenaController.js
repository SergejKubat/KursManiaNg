const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const kursId = req.query.kursId;
  const autorId = req.query.autorId;
  try {
    const query = {
      where: {}
    };

    if (kursId) {
      query.where.KURS_ID = kursId;
    }

    if (autorId) {
      query.where.AUTOR_ID = autorId;
    }

    const results = await models.ocena.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};