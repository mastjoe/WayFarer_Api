import express from 'express';
import SignupController from '../controllers/signin';

const router = express.Router();

router.post('/',SignupController.index);

module.exports = router;