import express from 'express';
import TripController from '../controllers/trip';
import TripMiddleware from '../middlewares/trip';
import UserMiddleware from '../middlewares/user';

const router = express.Router();

router.get('/', TripController.allTrips);
router.get('/:id', TripMiddleware.tripExist, TripController.findTrip);
router.post('/', TripMiddleware.tripBusExist, UserMiddleware.adminCheck, TripController.createTrip);
router.patch('/:id', UserMiddleware.adminCheck, TripController.cancelTrip);


module.exports = router;