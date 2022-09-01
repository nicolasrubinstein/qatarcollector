import { Close, Leaderboard } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthButton from "../authButton/AuthButton";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import {
  ISharedAlbumsContext,
  useSharedAlums,
} from "../../context/SharedAlbumsContext";

const Sidebar = ({
  onClose,
  opacity,
}: {
  onClose: any;
  opacity: "0" | "1";
}) => {
  const isSignedIn = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { sharedAlbums } = useSharedAlums() as ISharedAlbumsContext;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose();
  };

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
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {sharedAlbums.map((a) => (
                  <Link href={`/app/album/stats/${a.id}`} key={a.id}>
                    <MenuItem onClick={handleClose}>{a.name}</MenuItem>
                  </Link>
                ))}
              </Menu>

              <Button
                className={styles.stats}
                startIcon={<Leaderboard />}
                onClick={handleClick}
              >
                Estadísticas
              </Button>
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
