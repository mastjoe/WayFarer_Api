import express from 'express';
import BusController from '../controllers/bus';
import Auth from '../middlewares/auth';

const router = express.Router();

router.post('/add', BusController.addBus);
module.exports = router;