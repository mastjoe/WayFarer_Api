import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import Auth from './middlewares/auth';
import UserMiddleware from './middlewares/user';

import userRouter from './routes/user';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import tripRouter from './routes/trips';
import busRouter from './routes/bus';

const app = express();
const result = dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = express.Router();

// route group here...
// sign up...
app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/signin', signinRouter);
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/bus', Auth.verifyToken, UserMiddleware.check, busRouter);
app.use('/api/v1/users',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      status: 'error',
      error: error.message
    });
  })

module.exports = app;