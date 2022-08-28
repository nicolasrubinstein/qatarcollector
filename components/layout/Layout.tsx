import { IconButton } from "@mui/material";
import React from "react";
import styles from "./layout.module.scss";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import AuthButton from "../authButton/AuthButton";
import { useAuth } from "../../context/AuthContext";
import Head from "next/head";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const isSignedIn = useAuth();
  return (
    <>
      <Head>
        <title>Qatar Collector</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div>
        <header className={styles.header}>
          <div className={styles.back}>
            {router.asPath !== "/" && router.asPath !== "/app" && (
              <IconButton onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
            )}
          </div>
          <h1>Qatar collector 2022</h1>
          <div className={styles.auth}>
            <AuthButton isSignedIn={isSignedIn} />
          </div>

          <div></div>
        </header>
        {children}
        <div className={styles.authmob}>
          <AuthButton isSignedIn={isSignedIn} />
        </div>
      </div>
    </>
  );
};

export default Layout;
