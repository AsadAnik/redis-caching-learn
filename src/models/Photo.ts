export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotoCreate {
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotoUpdate {
    albumId?: number;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
}
