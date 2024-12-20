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
  fetchUserInfo: () => void;
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

  const fetchUserInfo = () => {
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
  };

  useEffect(() => {
    if (cookies.token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) {
      fetchUserInfo();
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userInfo, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
