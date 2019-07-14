import User from '../models/user';
import Error from '../helpers/errorHandlers';

export default class UserMiddleware {
    // use after token validation...
    static adminCheck(req, res, next) {
        let isAdmin = req.is_admin;
        if (req.is_admin) {
            return next();
        } else {
            res.status(403).json({
                status: 'error',
                error: 'Unauthorized admin'
            });
        }
    }

    static userExist(req, res, next) {
        let id = req.params.id;
        User.userIdExist(id)
        .then(r => {
            if (r.rowCount > 0) {
                return next();
            } else {
                Error.notFoundError(req, res);
            }
        })
        .catch(e => Error.serverError(req, res));
    }
}