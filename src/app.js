import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


const app = express();
const result = dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = express.Router();

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