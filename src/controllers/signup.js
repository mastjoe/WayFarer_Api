import Joi from '@hapi/joi';
import Error from '../helpers/errorHandlers';
import User from '../models/users';

export default class SignupController {
    static index(req, res) {
        // validation schema...   
        let schema = Joi.object().keys({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(5),
        });
  
        // validate inputs...
        Joi.validate(req.body, schema, (err, result) => {
          if (err) {
            Error.serverError(req, res, err.message, 422);
          } else {
            // check if email exist previously...
            User.emailExist(req, res)
            .then(({rowCount}) => {
              if (rowCount > 0) {
                // email is taken...
                Error.serverError(req, res, 'email is taken already', 422);
              } else {
                // email is available...
                User.createUser(req, res)
                .then(r => {
                  res.status(201).json({
                    status: 'success',
                    data: r.rows[0]
                  });
                })
                .catch(e => Error.serverError(req, res, 'error on creating user'));
              }
            })
            .catch(e => Error.serverError(req, res));
          }
        });
      }
}