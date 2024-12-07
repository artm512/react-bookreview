import { Outlet, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../../providers/AuthProvider";
import { useLogout } from "../../hooks/useLogout";

const gnavLinks = [
  {
    to: "/profile",
    label: "ユーザー情報編集",
  },
  {
    to: "/new",
    label: "レビュー投稿",
  },
];

export const ProtectedLayout = () => {
  const { userInfo } = useAuth();
  const { logout } = useLogout();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleClickLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white shadow">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8">
          <div className="flex">
            <Link to="/" className="font-semibold hover:opacity-70">
              書籍レビューアプリ
            </Link>
          </div>
          <div className="flex flex-1 gap-6 justify-end items-center">
            <span className="text-sm/6 bg-sky-700 text-white px-4 py-0.5">
              ユーザー名：{userInfo.name}
            </span>
            {gnavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm/6 text-gray-900 hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              className="text-sm/6 text-gray-900 hover:opacity-70"
              onClick={handleClickLogout}
            >
              ログアウト
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl p-12">
        <Outlet />
      </main>
    </>
  );
};
