export interface IPhoto {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface IPhotoCreate {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface IPhotoUpdate {
    albumId?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
}
