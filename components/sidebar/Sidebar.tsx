import { Close, Leaderboard } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import AuthButton from "../authButton/AuthButton";
import styles from "./sidebar.module.scss";

const Sidebar = ({ onClose, width }: { onClose: any; width: string }) => {
  const isSignedIn = useAuth();

  return (
    <div
      className={styles.sidebar}
      style={{
        width,
        display: width === "0px" ? "none" : "",
      }}
    >
      <div className={styles.close}>
        <IconButton onClick={() => onClose()}>
          <Close />
        </IconButton>
      </div>

      <section className={styles.content}>
        Próximamente
        <Button className={styles.stats} startIcon={<Leaderboard />}>
          Estadísticas
        </Button>
        <AuthButton isSignedIn={isSignedIn} />
      </section>
    </div>
  );
};

export default Sidebar;
