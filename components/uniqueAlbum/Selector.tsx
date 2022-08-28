import { Button, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { countries } from "../../firebase/albumData";
import { IAlbum } from "../../interfaces/IAlbum";
import styles from "./index.module.scss";

const Selector = ({ album }: { album: IAlbum }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [collected, setCollected] = useState(false);
  const [availableNums, setAvailableNums] = useState<number[]>([]);

  useEffect(() => {
    const a = album.stickers.map((s) => {
      if (s.country === selectedCountry) {
        return s.number;
      }
    });
    setAvailableNums(a.filter((item) => item) as number[]);
  }, [selectedCountry]);

  useEffect(() => {
    const selectedSticker = album.stickers.find((s) => {
      return s.country === selectedCountry && s.number == selectedNumber;
    });
    setCollected(Boolean(selectedSticker?.tenure));
  }, [selectedCountry, selectedNumber]);

  return (
    <div className={styles.content}>
      <section className={styles.selectors}>
        <Select
          className={styles.select1}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((c) => {
            return (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            );
          })}
        </Select>
        <Select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
        >
          {availableNums.map((c) => {
            return <MenuItem value={c}>{c}</MenuItem>;
          })}
        </Select>
      </section>
      <h2 className={styles.description}>
        {selectedCountry}:{" "}
        {availableNums.includes(selectedNumber) && selectedNumber}
      </h2>
      {availableNums.includes(selectedNumber) && (
        <div>
          {collected && (
            <h4 className={styles.found}>Se encuentra en la colección.</h4>
          )}
          {!collected && (
            <h4 className={styles.notFound}>
              No se encuentra en la colección.
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Selector;
