import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { IAlbum } from "../../../../interfaces/IAlbum";
import { db } from "../../../../firebase/db";
import styles from "../../../../styles/Stats.module.scss";
import CircularProgressWithLabel from "../../../../components/CircularProgressWithLabel";
import LinearProgressWithLabel from "../../../../components/LinearProgressWithLabel";
import {
  getAlbumProgress,
  getAlbumTotal,
  getAlbumTotalWithTenureOne,
  getCountryProgress,
  getCountryTotal,
  getCountryTotalWithTenure,
} from "../../../../functs";
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
            <h2>&quot;{album?.name}&quot;</h2>
            <div className={styles.statsSheet}>
              <div className={styles.percentage}>
                <h3>Porcentaje total del álbum completado:</h3>

                {album && (
                  <>
                    <CircularProgressWithLabel
                      value={getAlbumProgress(album as IAlbum)}
                      size={70}
                    />
                  </>
                )}
              </div>
              <h3>
                Figuritas totales: {"  "}
                {album && getAlbumTotalWithTenureOne(album as IAlbum)}/
                {album && getAlbumTotal(album as IAlbum)}
              </h3>
            </div>
          </section>
          <section className={styles.category}>
            <h3>Por categoría</h3>
            {countries.map((c) => {
              const countryProgress = album && getCountryProgress(album, c);
              return (
                <article
                  className={`${styles.bar} ${
                    countryProgress === 100 && styles.completed
                  }`}
                  key={c}
                >
                  <p>{c}</p>
                  {album && (
                    <>
                      <LinearProgressWithLabel
                        color="error"
                        value={countryProgress as number}
                      />{" "}
                      <div className={styles.totalCountry}>
                        <>
                          {getCountryTotalWithTenure(album, c)}/
                          {getCountryTotal(album, c)}
                        </>
                      </div>
                    </>
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
