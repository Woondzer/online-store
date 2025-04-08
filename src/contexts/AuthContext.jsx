import { createContext, useContext, useEffect, useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [extraUserData, setExtraUserData] = useState(null);

  //hämtar användarinformation för att tex kunna visa username som inloggad.
  useEffect(() => {
    const fetchExtraData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExtraUserData(docSnap.data());
        }
      } else {
        setExtraUserData(null);
      }
    };

    fetchExtraData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerUser = async (email, password, extraData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    //skapa dokument i users collection med ectra info
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      ...extraData,
    });

    return user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, registerUser, extraUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
