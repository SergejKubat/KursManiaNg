const express = require('express');

const autorController = require('../controllers/autorController');
const kategorijaController = require('../controllers/kategorijaController');
const kursController = require('../controllers/kursController');
const evidencijaController = require('../controllers/evidencijaController');
const korisnikController = require('../controllers/korisnikController');

const router = express.Router();

router.get('/autori', autorController.getAll);

router.get('/autori/:autorId', autorController.getById);

router.get('/kategorije', kategorijaController.getAll);

router.get('/kategorije/:kategorijaId', kategorijaController.getById);

router.get('/kursevi', kursController.getAll);

router.get('/kursevi/:kursId', kursController.getById);

router.get('/evidencije', evidencijaController.getAll);

router.get('/korisnici', korisnikController.getAll);

module.exports = router;