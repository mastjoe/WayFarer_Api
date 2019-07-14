import jwt from 'jsonwebtoken';

export default class Auth{
    static verifyToken(req, res, next) {
        const bearerHeader = req.headers['x-access-token'] || req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            return next();
        } else {
            res.status(403).json({
                status:'error',
                error: 'unauthorized operation'
            });
        }
    }
}