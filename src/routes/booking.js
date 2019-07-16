import express from 'express';
import BookingController from '../controllers/booking';
import BookingMiddleware from '../middlewares/bookings';

const router = express.Router();

router.get('/', BookingController.findAllBookings);
router.post('/', BookingController.book);
router.delete('/:id', BookingController.deleteBooking)

module.exports = router;