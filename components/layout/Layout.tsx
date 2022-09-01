import { IconButton } from "@mui/material";
import React, { useState } from "react";
import styles from "./layout.module.scss";
import { ArrowBack, Menu } from "@mui/icons-material";
import { useRouter } from "next/router";

import Head from "next/head";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [sidebarWidth, setSidebarWidth] = useState<"0" | "1">("0");

  const closeSidebar = () => {
    setSidebarWidth("0");
  };
  return (
    <>
      <Head>
        <title>Qatar Collector</title>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content={
            "Crea álbumes, marca las figuritas que ya coleccionaste, y compartelos con familia y amigos en tiempo real."
          }
        />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Sidebar opacity={sidebarWidth} onClose={closeSidebar} />
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
            <IconButton
              onClick={() => {
                setSidebarWidth("1");
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <Menu />
            </IconButton>
          </div>

          <div></div>
        </header>
        {children}
      </div>
    </>
  );
};

export default Layout;
