import jwt from 'jsonwebtoken';

export default class Auth{
    static verifyToken(req, res, next) {
        const bearerHeader = req.headers.authorization || req.headers.token ;
        if (typeof bearerHeader !== 'undefined') {
            if (req.headers.authorization) {
                const bearerToken = bearerHeader.split(' ')[1];
                req.token = bearerToken;
            } else {
                req.token = req.headers.token;
            }
            return Auth.validateToken(req, res, next);
        } else {
            res.status(403).json({
                status:'error',
                error: 'unauthorized operation'
            });
        }
    }

    static validateToken(req, res, next) {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    status: 'error',
                    error: 'Unauthorized token'
                });
            } else {
                req.is_admin = decoded.user.is_admin;
                return next();
            }
        });
    }
}