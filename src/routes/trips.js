import express from 'express';
import TripController from '../controllers/trip';
import Auth from '../middlewares/auth';
import TripMiddleware from '../middlewares/trip';
import UserMiddleware from '../middlewares/user';

const router = express.Router();

router.get('/', TripController.allTrips);
router.post('/create', TripMiddleware.tripBusExist, UserMiddleware.adminCheck, TripController.createTrip);

module.exports = router;