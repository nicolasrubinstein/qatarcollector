import styles from "./index.module.scss";

import React, { useEffect, useState } from "react";
import { ISticker } from "../../interfaces/IAlbum";
import { Button } from "@mui/material";

const SmallSticker = ({
  sticker,
  onChange,
}: {
  sticker: ISticker;
  onChange: any;
}) => {
  const [alert, setAlert] = useState(sticker.tenure);

  const handleClick = () => {
    setAlert((p) => (p ? 0 : 1));
    const { tenure, number, country } = sticker;
    const newTenure = tenure ? 0 : 1;
    onChange(country, number, newTenure);
  };

  useEffect(() => {
    setAlert(sticker.tenure);
  }, [sticker.tenure]);

  return (
    <Button
      className={styles.smallBtn}
      variant={alert ? "contained" : "text"}
      color={alert ? "error" : "primary"}
      onClick={handleClick}
    >
      {sticker.number}
    </Button>
  );
};

export default SmallSticker;
