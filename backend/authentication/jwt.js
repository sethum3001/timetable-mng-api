const JWT = require('jsonwebtoken');
const createError = require('http-errors'); 
const dotenv = require('dotenv');

module.exports = {
    signAccessToken: (userId,role,username) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: username,
                role: role,
                userId: userId
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '1h',
                issuer: 'yourdomain.com'
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized());
            }
            req.payload = payload;
            next();
        });
    }
}
    
 