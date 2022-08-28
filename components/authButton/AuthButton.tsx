import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useUser } from "../../context/UserContext";
import { signIn, signOut } from "../../funcs/authFuncs";
import styles from "./authButton.module.scss";

const AuthButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const props = useUser();

  const handleClick = async () => {
    if (isSignedIn) {
      signOut();
    } else {
      signIn(props.setUser);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.btn}
        onClick={handleClick}
        variant="outlined"
        startIcon={<Google />}
      >{`${isSignedIn ? "Cerrar" : "Iniciar"} sesión`}</Button>
    </div>
  );
};

export default AuthButton;
