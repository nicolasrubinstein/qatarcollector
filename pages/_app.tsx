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

function MyApp({ Component, pageProps }: AppProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const router = useRouter();

  initApp();

  useEffect(() => {
    authDetector(setIsSignedIn, setUser);
  }, []);

  useEffect(() => {
    if (!isSignedIn) router.push("/");
  }, [isSignedIn]);

  return (
    <Layout>
      <UserContext.Provider value={{ user, setUser }}>
        <AuthContext.Provider value={isSignedIn}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </UserContext.Provider>
    </Layout>
  );
}

export default MyApp;
