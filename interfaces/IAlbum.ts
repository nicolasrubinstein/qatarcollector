export interface ISticker {
  country: string;
  number: number;
  tenure: number;
}

export interface IAlbum {
  id: string;
  name: string;
  ownerId: string;
  stickers: ISticker[];
  collaboratorsEmail: string[];
}
