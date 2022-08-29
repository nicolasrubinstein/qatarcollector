import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { IAlbum } from "../../interfaces/IAlbum";
import styles from "./album.module.scss";

const Album = ({ album }: { album: IAlbum }) => {
  return (
    <div>
      <Link href={`/app/album/${album.id}`}>
        <Button className={styles.album}>
          <h2>{album.name}</h2>
        </Button>
      </Link>
    </div>
  );
};

export default Album;
