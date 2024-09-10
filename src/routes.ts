import { Router } from 'express';
import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
const router = Router();

router.post('/users',UserController.store);
router.post('/auth',AuthController.authenticate);

export default router;
