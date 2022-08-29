import { Button, TextField } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/db";
import { IAlbum } from "../../interfaces/IAlbum";
import styles from "./sharePopup.module.scss";

const SharePopup = ({ album, onClose }: { album: IAlbum; onClose: any }) => {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [btnText, setBtnText] = useState("agregar");

  const handleClick = async () => {
    if (!email.length || email.includes(" ")) {
      alert("Escrive una dirección de correo válida");
      return;
    }
    setBtnText("agregando...");
    const albumRef = doc(db, "albums", album.id);
    await updateDoc(albumRef, {
      collaboratorsEmail: arrayUnion(email.toLowerCase()),
    });
    setBtnText("agregar");
    setShowMessage(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 8000);
  }, [showMessage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.popup}>
        <a className={styles.close} onClick={onClose}>
          Cerrar
        </a>
        <h2>Agregar un colaborador</h2>
        <TextField
          className={styles.emailInput}
          label="E-mail del usuario (cuenta Google)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" onClick={handleClick}>
          {btnText}
        </Button>
        {showMessage && (
          <p className={styles.message}>
            La dirección de correo ha sido agregada a la lista de colaboradores.{" "}
            <a onClick={() => setEmail("")}>Agregar otra dirección</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SharePopup;
