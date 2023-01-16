export interface GetPicturesService {
    fetchPictures: (from: string, to?: string) => Promise<any>;
}
