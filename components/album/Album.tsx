import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { IAlbum } from "../../interfaces/IAlbum";
import styles from "./album.module.scss";

const Album = ({ album }: { album: IAlbum }) => {
  return (
    <div>
      <Button className={styles.album}>
        <Link href={`/app/album/${album.id}`}>
          <h2>{album.name}</h2>
        </Link>
      </Button>
    </div>
  );
};

export default Album;
