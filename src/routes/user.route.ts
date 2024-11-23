import { Router } from 'express';
import  { UserController } from '../controllers/';

// Create router
const router = Router();

// Intance of controller
const userController = new UserController();

// CRUD Routes
router.get('/', userController.getUsers);

export default router;