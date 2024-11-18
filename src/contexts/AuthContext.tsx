import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../interface";
import { auth } from "../services/firebase";

interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  authInitialized: boolean;
  handleInfoUser: (data: IUser) => void;
}

interface IProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser({
          name: data.displayName || "",
          email: data.email || "",
          uid: data.uid,
        });
      } else {
        setUser(null);
      }
      setAuthInitialized(true);
    });

    console.log("Carregou");

    return () => {
      unsub();
    };
  }, []);

  const handleInfoUser = (data: IUser) => {
    setUser({
      email: data.email,
      name: data.name,
      uid: data.uid,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        authInitialized,
        handleInfoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
