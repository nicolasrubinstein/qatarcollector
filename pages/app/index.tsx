import { Fab } from "@mui/material";
import React from "react";
import styles from "../../styles/App.module.scss";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";
import { IAlbum } from "../../interfaces/IAlbum";
import Album from "../../components/album/Album";
import {
  ISharedAlbumsContext,
  useSharedAlums,
} from "../../context/SharedAlbumsContext";

const App = () => {
  const router = useRouter();

  const { isLoading, sharedAlbums } = useSharedAlums() as ISharedAlbumsContext;

  return (
    <div>
      <section className={styles.content}>
        <h2 className={styles.title}>Mis álbumes</h2>
        <ul>
          {sharedAlbums.map((album: IAlbum) => {
            return <Album album={album} key={album.id} />;
          })}
          {isLoading && <h3>Buscando tus álbumes...</h3>}
          {!sharedAlbums.length && !isLoading && (
            <h3>Aún no tienes álbumes propios ni compartidos contigo.</h3>
          )}
        </ul>
        <Fab
          onClick={() => router.push("/app/album/new")}
          className={styles.fab}
        >
          <Add />
        </Fab>
      </section>
    </div>
  );
};

export default App;
