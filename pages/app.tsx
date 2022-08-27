import { Button, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import Album from "../components/album/Album";
import AuthButton from "../components/authButton/AuthButton";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/App.module.scss";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/db";
import { useUser } from "../context/UserContext";

const App = () => {
  const isSignedIn = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const [albums, setAlbums] = useState<any>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "albums"), where("userId", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      const albums: any[] = [];
      querySnapshot.forEach((doc) => {
        albums.push(doc.data().name);
      });
      setAlbums(albums);
    });
  }, [user]);

  return (
    <div>
      <section className={styles.content}>
        <h2>Mis álbumes</h2>
        <ul>
          {albums.map((album: any) => {
            return <Album />;
          })}
        </ul>
        <h2>Álbumes compartidos conmigo</h2>
        <ul></ul>
        <Fab onClick={() => router.push("/album/new")} className={styles.fab}>
          <Add />
        </Fab>
      </section>
    </div>
  );
};

export default App;
