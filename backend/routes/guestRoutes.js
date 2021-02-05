const express = require('express');
const multer = require('multer');
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

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type.');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

router.get('/autori', autorController.getAll);

router.get('/autori/:autorId', autorController.getById);

router.get('/kategorije', kategorijaController.getAll);

router.get('/kategorije/:kategorijaId', kategorijaController.getById);

router.get('/kursevi', kursController.getAll);

router.get('/kursevi/:kursId', kursController.getById);

router.get('/evidencije', evidencijaController.getAll);

router.post('/evidencije', checkAuth, evidencijaController.addNew);

router.get('/korisnici', korisnikController.getAll);

router.get('/korisnici/:korisnikId', korisnikController.getById);

router.put('/korisnici/:korisnikId', checkAuth, multer({ storage: storage }).single('image'), korisnikController.update);

router.get('/ocene', ocenaController.getAll);

router.post('/ocene', checkAuth, ocenaController.addNew);

router.delete('/ocene/:ocenaId', checkAuth, ocenaController.delete);

router.get('/sekcije', sekcijaController.getAll);

router.get('/lekcije', lekcijaController.getAll);

router.post('/prijava', korisnikController.logIn);

router.post('/registracija', korisnikController.registration);

module.exports = router;