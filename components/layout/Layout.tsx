import { IconButton } from "@mui/material";
import React from "react";
import styles from "./layout.module.scss";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();

  return (
    <div>
      {/* <AuthButton isSignedIn={isSignedIn} /> */}

      <header className={styles.header}>
        {router.asPath !== "/app" && (
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
        )}
        <h1>Qatar collector 2022</h1>
        <div></div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
