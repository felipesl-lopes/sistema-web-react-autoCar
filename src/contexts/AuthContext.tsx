import React, { createContext, useEffect, useState } from "react";
import { getErrorMessage } from "../errors/authErrors";
import { IUser } from "../interface";
import axiosService from "../services/api";

interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  authInitialized: boolean;
  handleInfoUser: (data: IUser) => void;
  emailVerified: boolean | undefined;
  loadingButton: boolean;
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface IProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    axiosService
      .get("/auth/login")
      .then(async ({ data }) => {
        if (data.uid) {
          setUser({
            name: data.name,
            email: data.email,
            uid: data.uid,
          });
        } else {
          setUser(null);
        }
      })
      .catch(async (error) => {
        getErrorMessage(error.code);
      })
      .finally(() => {
        setAuthInitialized(true);
      });

    return () => {};
  }, []);

  /**
   * Verificar se o e-mail do usuário está verificado
   */
  useEffect(() => {
    if (authInitialized && user) {
      axiosService("/auth/validation")
        .then(({ data }) => {
          setEmailVerified(data);
        })
        .catch((error) => {
          setEmailVerified(false);
          getErrorMessage(error);
        });
    }
  }, [authInitialized, user]);

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
        signed: !!user?.uid,
        user,
        authInitialized,
        handleInfoUser,
        emailVerified,
        loadingButton,
        setLoadingButton,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
