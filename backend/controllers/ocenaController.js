const sequelize = require("../config/database");
const initModels = require("../models/init-models");
const kurs = require("../models/kurs");

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
      query.where.KORISNIK_ID = autorId;
    }

    const results = await models.ocena.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.addNew = async (req, res, next) => {
  const korisnikId = req.body.KORISNIK_ID;
  const kursId = req.body.KURS_ID;
  const vrednost = req.body.OCENA_VREDNOST;
  const komentar = req.body.OCENA_KOMENTAR;

  const studentId = req.userData.studentId;

  if (korisnikId != studentId) {
    return res.status(401).json({ message: 'Autorizacija nije uspela.' });
  }

  const ocenaStudenta = await models.ocena.findOne({ 
    where: {
      KORISNIK_ID: korisnikId,
      KURS_ID: kursId
    }
  });

  if (ocenaStudenta) {
    return res.status(403).json({ message: 'Već ste ocenili ovaj kurs.' });
  }

  try {
    const newMark = await models.ocena.create({
      KORISNIK_ID: korisnikId,
      KURS_ID: kursId,
      OCENA_VREDNOST: vrednost,
      OCENA_KOMENTAR: komentar
    });
    res.status(200).json({ message: 'Ocena dodata.' });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Ocena nije dodata.' });
  }
}

exports.delete = async (req, res, next) => {
  const ocenaId = req.params.ocenaId;
  try {
    const ocena = await models.ocena.findOne({
      where: { OCENA_ID: ocenaId }
    });
    await ocena.destroy();
    res.status(200).json({ message: 'Ocena obrisana.' });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocena nije obrisana.' });
  }
}