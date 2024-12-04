import { Request, Response } from 'express';
import { PhotoServices } from '../services';
import { IPhoto, IPhotoCreate, IPhotoUpdate } from '../models/Photo';
import { getOrSetCache } from '../lib/redis';

class PhotoController {
    constructor(private readonly photoService: PhotoServices = new PhotoServices()) {
        // Using Arrow Function Instead of bind this. (This is not recommended)
        // this.getPhoto = this.getPhoto.bind(this);
    }

    /**
     * GET /photos
     * @param _req 
     * @param res 
     */
    public getPhotos = async (req: Request, res: Response): Promise<void> => {
        try {
            // Used the Cache-Aside Pattern by Redis
            const key: string = `get-${req.url}api/photos`;
            const photos: IPhoto[] = await getOrSetCache(key, async () => await this.photoService.getPhotos());

            res.status(200).send(photos);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }

    /**
     *  GET /photos/:id
     * @param req 
     * @param res 
     */
    public getPhoto = (req: Request, res: Response): void => {
        try {
            const photoId: number = Number(req.params.id);
            const photoDetails: IPhoto = this.photoService.getPhotoById(photoId);
            res.status(200).send(photoDetails);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }

    /**
     * POST /photos
     * @param req 
     * @param res 
     */
    public createPhoto = (req: Request, res: Response): void => {
        try {
            const photoData: IPhotoCreate = req.body as IPhotoCreate;
            const photoDetails = this.photoService.createPhoto(photoData);
            res.status(200).send(photoDetails);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }

    /**
     * PUT /photos/:id
     * @param req 
     * @param res 
     */
    public updatePhoto = (req: Request, res: Response): void => {
        try {
            const photoId: number = Number(req.params.id);
            const photoData: IPhotoUpdate = req.body as IPhotoUpdate;
            const updatedPhotoDetails = this.photoService.updatePhoto(photoId, photoData);
            res.status(200).send(updatedPhotoDetails);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }

    /**
     * DELETE /photos/:id
     * @param req 
     * @param res 
     */
    public deletePhoto = (req: Request, res: Response): void => {
        try {
            const photoId: number = Number(req.params.id);
            const deletedPhotoDetails: IPhoto = this.photoService.deletePhoto(photoId);
            res.status(200).send(deletedPhotoDetails);

        } catch (error: Error | any) {
            res.status(500).send(error.message);
        }
    }
}

export default PhotoController;