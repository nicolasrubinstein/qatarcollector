import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { IAlbum } from "../../../../interfaces/IAlbum";
import { db } from "../../../../firebase/db";
import styles from "../../../../styles/Stats.module.scss";
import CircularProgressWithLabel from "../../../../components/CircularProgressWithLabel";
import LinearProgressWithLabel from "../../../../components/LinearProgressWithLabel";
import { getAlbumProgress, getCountryProgress } from "../../../../functs";
import { countries } from "../../../../firebase/albumData";

const Stats = () => {
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const router = useRouter();
  const { albumId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

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
      setAlbum(albums.find((a) => a.id === albumId) as IAlbum);
    });
    setIsLoading(false);
  }, [user]);

  return (
    <div className={styles.container}>
      {isLoading && "Obteniendo datos del álbum..."}
      {!isLoading && (
        <>
          <section className={styles.total}>
            <h1>Estadsticas</h1>
            <h2>"{album?.name}"</h2>
            <h3>Porcentaje total del álbum completado</h3>

            {album && (
              <CircularProgressWithLabel
                value={getAlbumProgress(album as IAlbum)}
                size={100}
              />
            )}
          </section>
          <section className={styles.category}>
            <h3>Por categoría</h3>
            {countries.map((c) => {
              return (
                <article className={styles.bar}>
                  <p>{c}</p>
                  {album && (
                    <LinearProgressWithLabel
                      color="error"
                      value={getCountryProgress(album, c)}
                    />
                  )}
                </article>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

export default Stats;
