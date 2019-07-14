import express from 'express';
import BusController from '../controllers/bus';
import BusMiddleware from '../middlewares/bus';

const router = express.Router();

router.get('/',BusController.getAllBus);
router.get('/:id', BusMiddleware.busExist, BusController.findBus);
router.post('/add', BusController.addBus);
router.delete('/delete/:id', BusMiddleware.busExist, BusController.deleteBus)
module.exports = router;