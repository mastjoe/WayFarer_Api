import Bus from '../models/bus';
import Error from '../helpers/errorHandlers';

export default class BusMiddleware {
    static busExist (req, res, next) {
        Bus.select(req.params.id)
        .then(r => {
            if (r.rowCount > 0) {
                return next();
            } else {
                Error.notFoundError(req, res, 'bus not found');
            }
        })
        .catch(e => Error.serverError(req, res));
    }

    // check if bus already exist with plate number...
    static plateNumberExist (req, res, next) {
        Bus.findPlateNumber(req.body.number_plate)
        .then(r => {
            if (r.rowCount > 0) {
                Error.validationError(req, res,`number plate ${r.rows[0].number_plate} is already taken`);
            } else {
                return next();
            }
        })
        .catch(e => Error.serverError(req, res));
    }
}