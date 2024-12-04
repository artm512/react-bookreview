import { Outlet, Link } from "react-router-dom";
import "./index.css";

export const PublicLayout = () => {
  return (
    <>
      <header className="bg-white shadow">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8">
          <div className="flex">
            <Link to="/" className="font-semibold hover:opacity-70">
              書籍レビューアプリ
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <Link
              to="/login"
              className="text-sm/6 font-semibold text-gray-900 hover:opacity-70"
            >
              ログイン
            </Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl p-12">
        <Outlet />
      </main>
    </>
  );
};
