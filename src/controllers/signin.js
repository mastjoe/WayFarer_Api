import User from '../models/user';
import Joi from '@hapi/joi';
import Error from '../helpers/errorHandlers';
import jwt from 'jsonwebtoken';

export default class SignupController {
    static index(req, res) {
      let schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      // validate inputs...
      Joi.validate(req.body, schema, (err, result) => {
        if (err) {
          res.status(422).json({
            status: 'error',
            error: err.message
          });
        } else {
          User.userExist(req, res)
          .then((r) => {
            let token = jwt.sign({user:r.rows[0]}, process.env.SECRET_KEY, { expiresIn: '2h' });
            let id = r.rows[0].id;
            let isAdmin = r.rows[0].is_admin;
            let output = {
              status: 'success',
              data: {
                user_id: id,
                is_admin: isAdmin,
                token: token
              }
            }
            User.updateLastLogin(id);
            res.status(200).json(output);
          })
          .catch(e => {
            res.status(500).json({
              status: 'error',
              error: 'an error occurred'
            });
          });
        }
      });
    }
}