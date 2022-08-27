import { Button } from "@mui/material";
import React from "react";
import styles from "./album.module.scss";

const Album = () => {
  return (
    <div>
      <Button className={styles.album}>Album1</Button>
    </div>
  );
};

export default Album;
