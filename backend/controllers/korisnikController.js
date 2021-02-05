const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("../utils/util");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
  const email = req.query.email;
  try {
    const query = {
      where: {},
    };

    if (email) {
      query.where.KORISNIK_EMAIL = email;
    }

    const results = await models.korisnik.findAll(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.getById = async (req, res, next) => {
  const korisnikId = req.params.korisnikId;
  try {
    const result = await models.korisnik.findOne({
      where: { KORISNIK_ID: korisnikId },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.update = async (req, res, next) => {
  const korisnikId = req.params.korisnikId;
  const url = `${req.protocol}://${req.get("host")}`;
  const imagePath = `${url}/images/${req.file.filename}`;
  try {
    const student = await models.korisnik.findOne({
      where: { KORISNIK_ID: korisnikId },
    });
    student.KORISNIK_AVATAR = imagePath;
    await student.save();
    res.status(200).json({ message: "Avatar promenjen." });
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
};

exports.logIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await models.korisnik.findOne({
      where: {
        KORISNIK_EMAIL: email,
      },
    });

    if (result) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        result.KORISNIK_LOZINKA
      );
      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: result.KORISNIK_ID,
            name: result.KORISNIK_IME,
            email: result.KORISNIK_EMAIL,
          },
          "this_is_my_own_secret_key_for_jwt",
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          token: token,
          expiresIn: 3600,
          studentId: result.KORISNIK_ID,
        });
      } else {
        res.status(401).json({
          message: "Lozinke se ne poklapaju.",
        });
      }
    } else {
      res.status(401).json({
        message: "Korisnik ne postoji.",
      });
    }
  } catch (error) {
    res.status(404).send();
  }
};

exports.registration = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const avatarUrl = "http://localhost:3000/images/user.png";
  const registrationDate = util.dateToString();
  try {
    const newUser = await models.korisnik.create({
      KORISNIK_IME: name,
      KORISNIK_EMAIL: email,
      KORISNIK_AVATAR: avatarUrl,
      KORISNIK_DATUM_REGISTRACIJE: registrationDate,
      KORISNIK_LOZINKA: password,
      KORISNIK_IS_BLOCKED: false,
    });
    res.status(200).json({
      message: "Korisnik uspešno dodat.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Greška na serveru." });
  }
};