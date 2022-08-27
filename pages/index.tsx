import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signIn } from "../funcs/authFuncs";
import { useRouter } from "next/router";
import AuthButton from "../components/authButton/AuthButton";

const Home = () => {
  const isSignedIn = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn) {
      router.push("/app");
    }
  }, [isSignedIn]);

  return (
    <div style={{ marginTop: "200px" }}>
      <AuthButton isSignedIn={isSignedIn} />
    </div>
  );
};

export default Home;
