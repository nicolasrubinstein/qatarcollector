import { initDb, initApp } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const app = initApp();
export const db = initDb(app);

export const addAlbum = async (name: string, userId: string) => {
  const id = uuidv4();
  await setDoc(doc(db, "albums", id), {
    name,
    id,
    userId,
  });
};
