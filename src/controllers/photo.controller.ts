import { Request, Response } from 'express';
import { PhotoServices } from '../services';

class PhotoController {
    /**
     * GET /photos
     * @param _req 
     * @param res 
     */
    public getPhotos(_req: Request, res: Response): void {
        try {
            const photoService = new PhotoServices();
            const photos = photoService.getPhotos();
            res.status(200).send(photos);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }
}

export default PhotoController;