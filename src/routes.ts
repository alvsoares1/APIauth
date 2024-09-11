import { Router } from 'express';
import authMiddlaware from './middlewares/authMiddleware';
import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
const router = Router();

router.post('/users',UserController.store);
router.post('/auth',AuthController.authenticate);
router.get('/users',authMiddlaware,UserController.index);

export default router;
