import { initDb, initApp } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { countries, generateStickers } from "./albumData";

const app = initApp();
export const db = initDb(app);

export const addAlbum = async (name: string, email: string) => {
  const id = uuidv4();
  const stickers = generateStickers(countries);

  try {
    await setDoc(doc(db, "albums", id), {
      name,
      id,
      collaboratorsEmail: [email],
      stickers,
      ownerEmail: email,
    });
  } catch (err: any) {
    return { status: "err", message: err.message };
  }
};

export const addEmail = async (email: string) => {
  await setDoc(doc(db, "emails", email), {
    email,
  });
};
