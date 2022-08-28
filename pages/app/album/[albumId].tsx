import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { IAlbum } from "../../../interfaces/IAlbum";
import styles from "../../../styles/UniqueAlbum.module.scss";
import { db } from "../../../firebase/db";
import { useRouter } from "next/router";
import Selector from "../../../components/uniqueAlbum/Selector";
import GeneralView from "../../../components/uniqueAlbum/GeneralView";
import { PersonAdd } from "@mui/icons-material";
import SharePopup from "../../../components/sharePopup/SharePopup";
import { doc, deleteDoc } from "firebase/firestore";

type TChoice = "Vista general" | "Selector";

const UniqueAlbum = () => {
  const [choice, setChoice] = useState<TChoice>("Vista general");
  const { user } = useUser();
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const router = useRouter();
  const { albumId } = router.query;

  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  const handleDelete = async () => {
    if (!confirm("¿Está seguro de eliminar este album?")) return;
    await deleteDoc(doc(db, "albums", album?.id as string));
    router.push("/app");
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: TChoice
  ) => {
    setChoice(newChoice);
  };

  return (
    <>
      {showSharePopup && (
        <SharePopup
          album={album as IAlbum}
          onClose={() => setShowSharePopup(false)}
        />
      )}
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>{album?.name}</h1>
        <Button
          className={styles.addButton}
          variant="outlined"
          startIcon={<PersonAdd />}
          onClick={() => setShowSharePopup(true)}
        >
          Agregar personas a este álbum
        </Button>
        <ToggleButtonGroup value={choice} exclusive onChange={handleChange}>
          <ToggleButton value="Vista general">Vista general</ToggleButton>
          <ToggleButton value="Selector">Selector</ToggleButton>
        </ToggleButtonGroup>

        <section className={styles.display}>
          {album && (
            <>
              {choice === "Selector" ? (
                <Selector album={album} />
              ) : (
                <GeneralView album={album} />
              )}
            </>
          )}
        </section>
        <Button
          className={styles.deleteBtn}
          onClick={handleDelete}
          variant="contained"
          color="error"
        >
          Eliminar album
        </Button>
      </div>
    </>
  );
};

export default UniqueAlbum;
