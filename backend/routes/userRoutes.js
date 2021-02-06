const express = require('express');
const multer = require('multer');
const checkAuth = require("../auth/check-auth");

const korisnikController = require('../controllers/korisnikController');
const evidencijaController = require('../controllers/evidencijaController');
const ocenaController = require('../controllers/ocenaController');

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

router.post('/evidencije', checkAuth, evidencijaController.addNew);

router.put('/korisnici/:korisnikId', checkAuth, multer({ storage: storage }).single('image'), korisnikController.update);

router.post('/ocene', checkAuth, ocenaController.addNew);

router.delete('/ocene/:ocenaId', checkAuth, ocenaController.delete);

module.exports = router;