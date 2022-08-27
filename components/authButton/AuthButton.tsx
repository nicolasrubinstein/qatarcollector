import React from "react";
import { useUser } from "../../context/UserContext";
import { signIn, signOut } from "../../funcs/authFuncs";

const AuthButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const { user, setUser } = useUser();

  const handleClick = async () => {
    if (isSignedIn) {
      signOut();
    } else {
      signIn(setUser);
      console.log(user);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{`${
        isSignedIn ? "Cerrar" : "Iniciar"
      } sesión`}</button>
    </div>
  );
};

export default AuthButton;
