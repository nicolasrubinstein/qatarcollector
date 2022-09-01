import { createContext, useContext } from "react";
import { IAlbum } from "../interfaces/IAlbum";

export interface ISharedAlbumsContext {
  sharedAlbums: IAlbum[];
  isLoading: boolean;
}

export const SharedAlbumsContext = createContext<ISharedAlbumsContext | null>(
  null
);

export const useSharedAlums = () => useContext(SharedAlbumsContext);
