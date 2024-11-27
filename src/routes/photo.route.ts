import { Router } from 'express';
import  { PhotoController } from '../controllers';

// Create router
const router: Router = Router();

// Intance of controller
const photoController = new PhotoController();

// CRUD Routes
router.route('/')
    .get(photoController.getPhotos)
    .post(photoController.createPhoto);

router.route('/:id')
    .get(photoController.getPhoto)
    .put(photoController.updatePhoto)
    .delete(photoController.deletePhoto);

export default router;