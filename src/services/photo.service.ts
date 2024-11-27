import * as fs from 'fs';
import * as path from 'path';
import { IPhoto, IPhotoCreate, IPhotoUpdate } from '../models/Photo';

class PhotoServices {
    private dbPath: string = path.join(__dirname, '../db/db.json');
    private dbEncodingType: BufferEncoding = 'utf-8';
    private dbData: IPhoto[];

    constructor() {
        const dbJsonData = fs.readFileSync(this.dbPath, this.dbEncodingType).toString();
        this.dbData = JSON.parse(dbJsonData);
    }


    /**
     * GET PHOTOS SERVICE
     * @returns
     */
    public getPhotos(): IPhoto[] {
        try {
            // Get all photos data from Database..
            return this.dbData as IPhoto[];

        } catch (error: Error | any) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * GET PHOTO BY ID SERVICE
     * @param photoId 
     * @returns 
     */
    public getPhotoById(photoId: string | number): IPhoto {
        try {
            if (!photoId) throw new Error('Photo ID is required');

            // Get photo data from Database..
            const findData: IPhoto | undefined = this.dbData?.length > 0 ? this.dbData.find((data: IPhoto) => data.id === photoId) : undefined;

            if (!findData) throw new Error('Photo not found');

            // Return photo data..
            return findData;

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * CREATE PHOTO SERVICE
     * @param photoData 
     * @returns 
     */
    public createPhoto(photoData: IPhotoCreate): IPhoto {
        try {
            // Check photo data..
            if (!photoData) throw new Error('Photo data is required');

            // Create photo data..
            const newPhotoData: IPhotoCreate = {
                id: this.dbData.length + 1,
                albumId: photoData.albumId,
                title: photoData.title,
                url: photoData.url,
                thumbnailUrl: photoData.thumbnailUrl
            }

            // Push new photo data to database..
            this.dbData.push(newPhotoData);
            fs.writeFileSync(this.dbPath, JSON.stringify(this.dbData), this.dbEncodingType);

            // Return new photo data..
            return newPhotoData as IPhoto;

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * UPDATE PHOTO SERVICE
     * @param photoId 
     * @param photoData 
     */
    public updatePhoto(photoId: string | number, updatePhotoData: IPhotoUpdate): IPhoto {
        try {
            // Check photo ID..
            if (!photoId) throw new Error('Photo ID is required');

            const photoData: IPhoto | undefined = this.getPhotoById(photoId);

            // Check photo data..
            if (!photoData) throw new Error('Photo not found');

            // Update photo data..
            photoData.albumId = updatePhotoData.albumId ?? photoData.albumId;
            photoData.title = updatePhotoData.title ?? photoData.title;
            photoData.url = updatePhotoData.url ?? photoData.url;
            photoData.thumbnailUrl = updatePhotoData.thumbnailUrl ?? photoData.thumbnailUrl;

            // Update photo data in Database..
            this.dbData = this.dbData.map((data: IPhoto) => data.id === photoId ? photoData : data);
            fs.writeFileSync(this.dbPath, JSON.stringify(this.dbData), this.dbEncodingType);

            // Return updated photo data..
            return photoData as IPhoto;

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * DELETE PHOTO SERVICE
     * @param photoId 
     * @returns 
     */
    public deletePhoto(photoId: string | number): IPhoto {
        try {
            // Check photo ID..
            if (!photoId) throw new Error('Photo ID is required'); 

            const photoData: IPhoto | undefined = this.getPhotoById(photoId);

            // Check photo data..
            if (!photoData) throw new Error('Photo not found');

            // Delete photo data from Database..
            this.dbData = this.dbData.filter((data: IPhoto) => data.id !== photoId);
            fs.writeFileSync(this.dbPath, JSON.stringify(this.dbData), this.dbEncodingType);

            // Return deleted photo data..
            return photoData as IPhoto;

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
}

export default PhotoServices;