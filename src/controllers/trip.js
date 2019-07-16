import Trip from '../models/trip';
import Error from '../helpers/errorHandlers';
import Success from '../helpers/successHandler';
import Joi from '@hapi/joi';

export default class TripController {
    static allTrips(req, res) {
        let queries = req.query;
        let queryKeys = Object.keys(queries);
        let firstKey = queryKeys[0];

        let queryVals = Object.values(queries);
        let firstVal = queryVals[0];

        if (Object.entries(queries).length > 0) {
            if (firstKey == 'destination') {
                // filter by destination...
                Trip.tripDestinationFilter(firstVal)
                .then(r => Success.successReport(req, res, r.rows))
                .catch(e => Error.serverError(req, res));
            } else if(firstKey == 'origin') {
                // filter by origin...
                Trip.tripOriginFilter(firstVal)
                .then(r => Success.successReport(req, res, r.rows))
                .catch(e => Error.serverError(req, res));
            }
        } else{
            Trip.findAll(req, res)
            .then(r => Success.successReport(req, res, r.rows))
            .catch(e => Error.serverError(req, res));
        }
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

    static findTrip(req, res) {
        Trip.find(req.params.id)
        .then(r => Success.successReport(req, res, r.rows[0]))
        .catch(e => Error.serverError(req, res));
    }

    static cancelTrip(req, res) {
        let tripId = req.params.id;
        Trip.cancelTrip(tripId)
        .then(r => Success.successMessageReport(req, res, 'Trip cancelled successfully'))
        .catch(e => Error.serverError(req, res));
    }
}