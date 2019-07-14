import express from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middlewares/user';

const router = express.Router();

router.get('/', UserController.allUsers);
router.get('/:id', UserMiddleware.userExist, UserController.findUser);
router.put('/make-admin/:id', UserMiddleware.userExist, UserController.makeAdmin)

module.exports = router;