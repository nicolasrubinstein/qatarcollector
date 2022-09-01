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
