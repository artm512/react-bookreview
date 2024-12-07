import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

import { api } from "../utils/api";

type UserInfoType = {
  name: string;
  iconUrl: string | undefined;
};

type ContextType = {
  auth: boolean | undefined;
  userInfo: UserInfoType;
  setAuth: Dispatch<boolean>;
};

export const AuthContext = createContext({} as ContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies();
  const [auth, setAuth] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "",
    iconUrl: undefined,
  });

  useEffect(() => {
    if (cookies.token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) {
      api
        .get("/users", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
