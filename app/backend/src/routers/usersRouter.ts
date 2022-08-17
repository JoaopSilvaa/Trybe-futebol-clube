import * as Router from 'express';
import validationLogin from '../middlewares/loginMiddleware';
import UserController from '../controllers/usersController';
import UserService from '../services/usersService';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/login', validationLogin, userController.login);

export default router;
