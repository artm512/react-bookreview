import { Outlet, Link } from "react-router-dom";

import "./index.css";

export const PublicLayout = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1>書籍レビューアプリ</h1>
        </Link>

        <ul>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
