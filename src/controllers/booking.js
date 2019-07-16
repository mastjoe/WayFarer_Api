import Booking from '../models/booking';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import Error from '../helpers/errorHandlers';
import Success from '../helpers/successHandler';

export default class BookingController {
    static findAllBookings(req, res) {
        let decoded = jwt.verify(req.token, process.env.SECRET_KEY);
        let adminStatus = decoded.user.is_admin;
        if (adminStatus) {
            // admin...
            Booking.findAll(req, res)
            .then(r => Success.successReport(req, res, r.rows) )
            .catch(e => Error.serverError(req,res));
        } else {
            // not admin...
            Booking.find(decoded.user.id)
            .then(r => Success.successReport(req, res, r.rows))
            .catch(e => Error.serverError(req, res));
        }
    }

    static book(req, res) {
       let schema = Joi.object().keys({
           seat_number: Joi.required(),
           trip_id: Joi.required()
       });

       Joi.validate(req.body, schema, (err, values) => {
            if (err) {
                Error.validationError(req, res, err.message);
            } else {
                Booking.create(req, res)
                .then(r => { Success.successReport(req, res, r.rows[0]) })
                .catch(e => Error.serverError(req, res, 'error in booking ticket'));
            }
       });
    }

    static deleteBooking(req, res) {
        Booking.delete(req, res)
        .then(r => res.send('deleted'))
        .catch(e => res.send('not deleted'+e));
    }
}