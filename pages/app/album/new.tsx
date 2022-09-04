import React, { useEffect, useState } from "react";
import styles from "../../../styles/newAlbum.module.scss";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import { addAlbum } from "../../../firebase/db";
import { useRouter } from "next/router";
import { useUser } from "../../../context/UserContext";

const NewAlbum = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [label, setLabel] = useState("Crear");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!name.length) {
      alert("Escriba un nombre para el álbum");
      return;
    }
    setLabel("Creando...");
    const x = await addAlbum(name, user.email);
    if (x?.status === "err") {
      setLabel("Crear");
      return alert("Hubo un error");
    }
    alert(`El álbum ${name} ha sido creado`);
    router.push("/app");
  };
  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        id="outlined-basic"
        label="Nombre del álbum"
        variant="outlined"
        placeholder="Álbum de Juan"
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ maxLength: 38 }}
      />
      <h3 className={styles.label}>{name}</h3>
      <Image
        className={styles.img}
        src="/albumimg.png"
        alt="album"
        width={344}
        height={400}
      />
      <Button className={styles.submitButton} onClick={handleSubmit}>
        {label}
      </Button>
    </div>
  );
};

export default NewAlbum;
