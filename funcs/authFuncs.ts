import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as signOutWithPopup,
  User,
} from "firebase/auth";
import { provider } from "../firebase/auth";
import { addEmail } from "../firebase/db";

export const authDetector = (
  stateChanger: (val: boolean) => any,
  setUser: any
) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      stateChanger(true);
      setUser(user);
    } else {
      stateChanger(false);
    }
  });
};

export const signIn = (setUser: any) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      addEmail(result.user.email as string);
      setUser(result.user);
    })
    .catch((error) => {
      // console.log("Error");
    });
};

export const signOut = () => {
  const auth = getAuth();
  signOutWithPopup(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
