import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const logout = () => {
    setAuth(false);
    removeCookie("token");
    navigate("/login");
  };

  return {
    logout,
  };
};
