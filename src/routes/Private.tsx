import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ScreenLoading } from "../components/screenLoading";

interface IProps {
  children: React.ReactNode;
}

export const Private: React.FunctionComponent<IProps> = ({ children }) => {
  const { signed, authInitialized } = useContext(AuthContext);

  if (!authInitialized) {
    return <ScreenLoading />;
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
