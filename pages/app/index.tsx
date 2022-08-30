import { Button, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthButton from "../../components/authButton/AuthButton";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/App.module.scss";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/db";
import { useUser } from "../../context/UserContext";
import { IAlbum } from "../../interfaces/IAlbum";
import Album from "../../components/album/Album";

const App = () => {
  const isSignedIn = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const [sharedAlbums, setSharedAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    const q = query(
      collection(db, "albums"),
      where("collaboratorsEmail", "array-contains", user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      const albums: IAlbum[] = [];
      querySnapshot.forEach((doc) => {
        albums.push(doc.data() as IAlbum);
      });
      setSharedAlbums(albums);
      setIsLoading(false);
    });
  }, [user]);

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
