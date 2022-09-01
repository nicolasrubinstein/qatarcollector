import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { initApp, initDb } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { authDetector } from "../funcs/authFuncs";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { UserContext } from "../context/UserContext";
import { User } from "firebase/auth";
import { IAlbum } from "../interfaces/IAlbum";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "../firebase/db";
import { SharedAlbumsContext } from "../context/SharedAlbumsContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [sharedAlbums, setSharedAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  initApp();

  useEffect(() => {
    authDetector(setIsSignedIn, setUser);
  }, []);

  useEffect(() => {
    if (!isSignedIn) router.push("/");
  }, [isSignedIn]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    const q = query(
      collection(db, "albums"),
      where("collaboratorsEmail", "array-contains", user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      const albums: IAlbum[] = [];
      querySnapshot.forEach((doc) => {
        albums.push(doc.data() as IAlbum);
      });
      setSharedAlbums(albums);
      setIsLoading(false);
    });
  }, [user]);

  return (
    <AuthContext.Provider value={isSignedIn}>
      <UserContext.Provider value={{ user, setUser }}>
        <SharedAlbumsContext.Provider value={{ sharedAlbums, isLoading }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SharedAlbumsContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
