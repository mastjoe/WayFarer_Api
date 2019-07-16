import Bus from '../models/bus';
import Trip from '../models/trip';
import Error from '../helpers/errorHandlers';

export default class TripMiddleware {
    static tripBusExist(req, res, next) {
        Bus.select(req.body.bus_id)
        .then(r => {
            if (r.rowCount > 0) {
                return next();
            } else {
                Error.notFoundError(req, res, `No bus has id ${req.body.bus_id}`);
            }
        })
        .catch(e => Error.serverError(req, res));
    }

    static tripExist(req, res, next) {
        Trip.find(req.params.id)
        .then(r => {
            if (r.rowCount > 0) {
                return next();
            } else {
                Error.notFoundError(req, res, `Trip with id ${req.params.id} not found`);
            }
        })
        .catch(e => Error.serverError(req, res));
    }
}