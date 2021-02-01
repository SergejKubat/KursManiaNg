const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'this_is_my_own_secret_key_for_jwt');
    } 
    catch (error) {
        res.status(401).json({
            message: 'Autorizacija nije uspela.'
        });
    }
};