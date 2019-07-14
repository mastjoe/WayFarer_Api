import express from 'express';
import TripController from '../controllers/trip';
import Auth from '../middlewares/auth';

const router = express.Router();

router.post('/create',TripController.createTrip);

module.exports = router;