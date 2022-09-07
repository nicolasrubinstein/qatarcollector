import { IAlbum } from "./interfaces/IAlbum";

export const getAlbumProgress = (album: IAlbum) => {
  const stickersTotalQuantity = album.stickers.length;
  const stickersWithTenureOne = album.stickers.filter((s) => s.tenure);
  const stickerWithTenureOneTotalQuantity = stickersWithTenureOne.length;

  const percentage =
    (stickerWithTenureOneTotalQuantity / stickersTotalQuantity) * 100;

  return percentage;
};

export const getCountryProgress = (album: IAlbum, country: string) => {
  const countryTotalStickers = album.stickers.filter(
    (s) => s.country === country
  );
  const countryTotalQuantityWithTenure = countryTotalStickers.filter(
    (s) => s.tenure
  ).length;

  const percentage =
    (countryTotalQuantityWithTenure / countryTotalStickers.length) * 100;

  return percentage;
};

export const getCountryTotal = (album: IAlbum, country: string) => {
  const countryTotalStickers = album.stickers.filter(
    (s) => s.country === country
  );
  return countryTotalStickers.length;
};

export const getCountryTotalWithTenure = (album: IAlbum, country: string) => {
  const countryTotalStickers = album.stickers.filter(
    (s) => s.country === country
  );
  const countryTotalQuantityWithTenure = countryTotalStickers.filter(
    (s) => s.tenure
  ).length;
  return countryTotalQuantityWithTenure;
};

export const getAlbumTotal = (album: IAlbum) => {
  const stickersTotalQuantity = album.stickers.length;
  return stickersTotalQuantity;
};

export const getAlbumTotalWithTenureOne = (album: IAlbum) => {
  const stickersWithTenureOne = album.stickers.filter((s) => s.tenure);
  const stickerWithTenureOneTotalQuantity = stickersWithTenureOne.length;
  return stickerWithTenureOneTotalQuantity;
};
