import Bus from '../models/bus';
import Error from '../helpers/errorHandlers';

export default class BusMiddleware {
    static busExist (req, res, next) {
        Bus.select(req.params.id)
        .then(r => {
            if (r.rowCount > 0) {
                return next();
            } else{
                Error.notFoundError(req, res, 'bus not found');
            }
        })
        .catch(e => Error.serverError(req, res));
    }
}