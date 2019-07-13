import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

router.post('/',UserController.signUp);

module.exports = router;