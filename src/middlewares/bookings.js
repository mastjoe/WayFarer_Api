import Bus from '../models/bus';
import Trip from '../models/trip';
import Error from '../helpers/errorHandlers';

export default class BookingMiddleware {
    static seatReg(req, res, next) {
        if('seat_number' in req.body) {
            return next();
        } else {
            res.status(422).json({
                status: 'error',
                error: 'seat number is required'
            });
        }
    }

    static tripReg(req, res, next) {
        Trip.find(req.body.trip_id)
        .then(r => {
            if (r.rowCount > 0) {
               return next();
            } else {
                res.status(400).json({
                    status: 'error',
                    error: 'trip id is invalid'
                });
            }
        })
        .catch(e => Error.serverError(req, res))
    }
}