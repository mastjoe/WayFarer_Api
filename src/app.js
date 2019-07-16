import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerJSDoc  from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import Auth from './middlewares/auth';
import UserMiddleware from './middlewares/user';

import userRouter from './routes/user';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import tripRouter from './routes/trips';
import busRouter from './routes/bus';
import bookingRouter from './routes/booking';

const app = express();
const result = dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = express.Router();

// route group here...
// sign up...
app.use('/api/v1/auth/signup', signupRouter);
app.use('/api/v1/auth/signin', signinRouter);
app.use('/api/v1/trips', Auth.verifyToken, tripRouter);
app.use('/api/v1/bus', Auth.verifyToken, UserMiddleware.adminCheck, busRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/bookings', Auth.verifyToken, bookingRouter);

const swaggerDefinition = {
  info: {
    title: 'REST API for WayFarer App', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for my product', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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