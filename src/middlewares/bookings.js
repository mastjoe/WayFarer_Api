import Bus from '../models/bus';
import Trip from '../models/trip';
import Booking from '../models/booking';
import Error from '../helpers/errorHandlers';
import jwt from 'jsonwebtoken';

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

    // check if trip id is valid...
    static checkTripId(req, res, next) {
        Trip.find(req.body.trip_id)
        .then(r => {
            if (r.rowCount > 0) {
               return next();
            } else {
                res.status(400).json({
                    status: 'error',
                    error: `trip id of ${req.body.trip_id} is invalid`
                });
            }
        })
        .catch(e => Error.serverError(req, res))
    }

    // check if seat is available against trip id...
    static checkTripBooking (req, res, next) {
        Booking.checkTripSeat(req, res)
        .then(r => {
           if (r.rowCount == 0) {
                return BookingMiddleware.checkTripId(req, res, next);
           } else {
               Error.validationError(req, res, `seat number ${req.body.seat_number} is already picked`);
           }
        })
        .catch(e => Error.serverError(req, res));
    }

    static bookingOwner(req, res, next) {
        let {user} = jwt.verify(req.token,process.env.SECRET_KEY);
        let userId = user.id;
        let bookingId = req.params.id;

        Booking.select(bookingId)
        .then(r => {
            if (userId == r.rows[0].user_id){
                return next();
            } else {
                Error.serverError(req, res, 'sorry user don\'t own booking');
            }
        })
        .catch(e => Error.serverError(req, res,'could not delete booking', 400));
    }

}