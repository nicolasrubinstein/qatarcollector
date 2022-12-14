import { ISticker } from "../interfaces/IAlbum";

export const countries = [
  "FWC (figuritas especiales)",
  "C (cocacola)",
  "Qatar",
  "Ecuador",
  "Senegal",
  "Países Bajos",
  "Inglaterra",
  "Irán",
  "Estados Unidos",
  "Gales",
  "Argentina",
  "Arabia Saudita",
  "México",
  "Polonia",
  "Francia",
  "Australia",
  "Dinamarca",
  "Túnez",
  "España",
  "Costa Rica",
  "Alemania",
  "Japón",
  "Bélgica",
  "Canadá",
  "Marruecos",
  "Croacia",
  "Brasil",
  "Serbia",
  "Suiza",
  "Camerún",
  "Portugal",
  "Ghana",
  "Uruguay",
  "Corea del Sur",
];

export const generateStickers = (countries: string[]) => {
  let stickers: ISticker[] = [];

  countries.forEach((country) => {
    let limit: number;

    if (country === "FWC (figuritas especiales)") {
      limit = 29;
    } else if (country === "C (cocacola)") {
      limit = 8;
    } else {
      limit = 19;
    }

    for (let i = 0; i <= limit; i++) {
      if (i === 0 && country !== "FWC (figuritas especiales)") continue;
      stickers.push({ country, number: i, tenure: 0 });
    }
  });
  return stickers;
};
