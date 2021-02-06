const sequelize = require("../config/database");
const util = require('../utils/util');
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

exports.addNew = async (req, res, next) => {
  const korisnikId = req.body.KORISNIK_ID;
  const kursId = req.body.KURS_ID;
  const datum = util.dateToString();

  const studentId = req.userData.studentId;

  if (korisnikId != studentId) {
    return res.status(401).json({ message: 'Autorizacija nije uspela.' });
  }
  
  try {
    const newRecord = await models.evidencija.create({
      KORISNIK_ID: korisnikId,
      KURS_ID: kursId,
      EVIDENCIJA_DATUM: datum
    });
    res.status(200).json({ message: 'Kurs uspešno kupljen.' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Greška na serveru.' })
  }
}