import Joi from '@hapi/joi';
import Error from '../helpers/errorHandlers';
import User from '../models/user';

export default class UsersController {
    static allUsers(req, res) {
        User.findAll(req, res)
        .then(r => res.status(200).json(r.rows))
        .catch(e => res.status(5000).json({
            status: 'error',
            error: 'something went wrong'
        }));
    }

    static findUser(req, res) {
        User.find(req.params.id)
        .then(r => res.status(200).json(r.rows[0]))
        .catch(e => Error.serverError(req, res));
    } 
    
    static makeAdmin(req, res) {
        User.assignAdmin(req.params.id)
        .then(r => {
            res.status(200).json({
                status: 'success',
                message: 'user successfully assigned admin'
            });
        })
        .catch(e => Error.serverError(req, res));
    }
}