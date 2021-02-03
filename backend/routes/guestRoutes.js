const express = require('express');
const checkAuth = require("../auth/check-auth");

const autorController = require('../controllers/autorController');
const kategorijaController = require('../controllers/kategorijaController');
const kursController = require('../controllers/kursController');
const evidencijaController = require('../controllers/evidencijaController');
const korisnikController = require('../controllers/korisnikController');
const ocenaController = require('../controllers/ocenaController');
const sekcijaController = require('../controllers/sekcijaController');
const lekcijaController = require('../controllers/lekcijaController');

const router = express.Router();

router.get('/autori', autorController.getAll);

router.get('/autori/:autorId', autorController.getById);

router.get('/kategorije', kategorijaController.getAll);

router.get('/kategorije/:kategorijaId', kategorijaController.getById);

router.get('/kursevi', kursController.getAll);

router.get('/kursevi/:kursId', kursController.getById);

router.get('/evidencije', evidencijaController.getAll);

router.get('/korisnici', korisnikController.getAll);

router.get('/korisnici/:korisnikId', checkAuth, korisnikController.getById);

router.get('/ocene', ocenaController.getAll);

router.post('/ocene', checkAuth, ocenaController.addNew);

router.delete('/ocene/:ocenaId', checkAuth, ocenaController.delete);

router.get('/sekcije', sekcijaController.getAll);

router.get('/lekcije', lekcijaController.getAll);

router.post('/prijava', korisnikController.logIn);

router.post('/registracija', korisnikController.registration);

module.exports = router;