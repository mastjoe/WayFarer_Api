import Trip from '../models/trip';
import Error from '../helpers/errorHandlers';
import Success from '../helpers/successHandler';
import Joi from '@hapi/joi';

export default class TripController {
    static allTrips(req, res) {
        Trip.findAll(req, res)
        .then(r => Success.successReport(req, res, r.rows))
        .catch(e => Error.serverError(req, res));
    }

    static createTrip(req, res) {
        let schema = Joi.object().keys({
            bus_id: Joi.number().integer().required(),
            origin: Joi.string().min(2).required(),
            destination: Joi.string().min(2).required(),
            trip_date: Joi.required(),
            fare: Joi.number().required()            
        });
        
        Joi.validate( req.body, schema, (err, values) => {
            if (err) {
                Error.validationError(req, res, err.message);
            } else {
                Trip.createTrip(req, res)
                .then(r => Success.successReport(req, res, r.rows))
                .catch(e => Error.serverError(req, res));
            }
        });
    }
}