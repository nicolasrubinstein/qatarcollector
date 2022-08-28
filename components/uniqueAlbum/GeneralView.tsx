import React, { useState } from "react";
import { IAlbum } from "../../interfaces/IAlbum";
import styles from "./index.module.scss";
import { countries } from "../../firebase/albumData";
import SmallSticker from "./SmallSticker";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/db";
import { Switch } from "@mui/material";

const GeneralView = ({ album }: { album: IAlbum }) => {
  const [onlyMissing, setOnlyMissing] = useState(false);

  const handleChange = (country: string, number: number, newTenure: number) => {
    const newStickersArray = album.stickers.map((s) => {
      if (s.country === country && s.number === number) {
        return { ...s, tenure: newTenure };
      } else {
        return s;
      }
    });
    const albumRef = doc(db, "albums", album.id);
    setDoc(albumRef, { stickers: newStickersArray }, { merge: true });
  };
  return (
    <div className={styles.content}>
      <section className={styles.genView}>
        <p>Pulse cada número para indicar que ya está en su colección.</p>
        <div className={styles.switchArea}>
          <p>Mostrar únicamente las faltantes</p>
          <Switch
            checked={onlyMissing}
            onChange={(e) => setOnlyMissing(e.target.checked)}
          />
        </div>
        {countries.map((country) => {
          const countryStickers = album.stickers.filter(
            (s) => s.country === country
          );
          return (
            <div key={country} className={styles.country}>
              <h3>{country}</h3>
              {countryStickers.map((s) => {
                {
                  return (
                    ((onlyMissing && !s.tenure) || !onlyMissing) && (
                      <SmallSticker
                        key={s.country + s.number}
                        sticker={s}
                        onChange={handleChange}
                      />
                    )
                  );
                }
              })}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default GeneralView;
