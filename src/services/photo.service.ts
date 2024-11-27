import * as fs from 'fs';
import * as path from 'path';

class PhotoServices {
    /**
     * GET PHOTOS SERVICE
     * @returns
     */
    public getPhotos(): any {
        try {
            const dbJsonData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
            const dbParsedData = JSON.parse(dbJsonData);
            return dbParsedData;

        } catch (error : Error | any) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }

    public getPhotoById(photoId: string | number): string {
        return "db";
    }
}

export default PhotoServices;