import { Router } from 'express';
import  { PhotoController } from '../controllers';

// Create router
const router: Router = Router();

// Intance of controller
const photoController = new PhotoController();

// CRUD Routes
router.get('/', photoController.getPhotos);

export default router;