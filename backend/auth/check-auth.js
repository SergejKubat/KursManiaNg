const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken =  jwt.verify(token, 'this_is_my_own_secret_key_for_jwt');
        req.userData = {
            studentId: decodedToken.id
        };
        next();
    } 
    catch (error) {
        res.status(401).json({
            message: 'Autentifikacija nije uspela.'
        });
    }
};