import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

type ContextType = {
  auth: boolean | undefined;
  setAuth: Dispatch<boolean>;
};

export const AuthContext = createContext({} as ContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    // TODO: cookieにtokenがあるかでログイン状態を判定し、存在していればauthにtrueを入れる
    if (cookies.token) setAuth(true);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
