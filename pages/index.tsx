import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signIn } from "../funcs/authFuncs";
import { useRouter } from "next/router";
import AuthButton from "../components/authButton/AuthButton";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

const Home = () => {
  const isSignedIn = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/app");
    }
  }, [isSignedIn]);

  return (
    <div style={{ marginTop: "100px" }} className={styles.container}>
      <h2>
        Todos tus <span className={styles.title1}>álbumes</span>, todas tus{" "}
        <span className={styles.title2}>figuritas</span>, un solo{" "}
        <span className={styles.title3}>lugar</span>.
      </h2>
      <Image src="/coverimg.png" alt="cover" height="256" width="256" />
      <p>
        Crea álbumes, marca las figuritas que ya coleccionaste, y compartelos
        con familia y amigos en tiempo real.
      </p>
    </div>
  );
};

export default Home;
