const sequelize = require('../config/database');
const initModels = require('../models/init-models');

const models = initModels(sequelize);

exports.getAll = async (req, res, next) => {
    try {
        const results = await models.autor.findAll({ attributes: ['AUTOR_IME', 'AUTOR_ZANIMANJE', 'AUTOR_OPIS'] });
        res.status(200).json(results);
    } catch(error) {
        console.error(error);
    }
};
