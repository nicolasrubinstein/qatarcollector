import { Close, Leaderboard } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthButton from "../authButton/AuthButton";
import styles from "./sidebar.module.scss";
import Link from "next/link";

const Sidebar = ({
  onClose,
  opacity,
}: {
  onClose: any;
  opacity: "0" | "1";
}) => {
  const isSignedIn = useAuth();

  return (
    <>
      <div
        className={styles.sidebar}
        style={{ opacity, pointerEvents: opacity === "0" ? "none" : undefined }}
      >
        <div className={styles.close}>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </div>

        <section className={styles.content}>
          {isSignedIn && (
            <>
              <Link href={`/app/album/${""}`}>
                <Button className={styles.stats} startIcon={<Leaderboard />}>
                  Estadísticas
                </Button>
              </Link>
            </>
          )}
          <a onClick={() => onClose()}>
            <AuthButton isSignedIn={isSignedIn} />
          </a>
        </section>
      </div>
    </>
  );
};

export default Sidebar;
