import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import Error from '../helpers/errorHandlers';
import Success from '../helpers/successHandler';
import Bus from '../models/bus';

export default class BusController {
    static getAllBus(req, res) {
        Bus.findAll(req, res)
        .then(r => Success.successReport(req, res, r.rows))
        .catch( e => Error.serverError(req, res));
    }

    static addBus(req, res) {
       let schema = Joi.object().keys({
         number_plate: Joi.string().required(),
         manufacturer: Joi.string().required(),
         model: Joi.string().required(),
         year: Joi.string().min(4).max(4).required(),
         capacity: Joi.number().min(3).integer().required()
       });

       Joi.validate(req.body, schema, (err, value) => {
         if (err) {
            Error.validationError(req, res, err.message);
         } else {
             Bus.addBus(req, res)
             .then(r => Success.successReport(req, res, r.rows[0]))
             .catch(e => Error.serverError(req, res));
         }
       });
    }

    // delete specific bus..
    static deleteBus(req, res) {
        Bus.deleteBus(req.params.id)
        .then(r => Success.successMessageReport(req, res, 'bus successfully deleted'))
        .catch(e => Error.serverError(req, res));
    }

    // find specific bus...
    static findBus(req, res) {
         Bus.select(req.params.id)
         .then(r => Success.successReport(req, res, r.rows[0]))
         .catch(e => Error.serverError(req, res));
    }
}