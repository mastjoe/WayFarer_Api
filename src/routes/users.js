import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

router.post('/signup',UserController.signUp);

module.exports = router;