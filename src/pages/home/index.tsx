import { Navigate } from "react-router-dom";
import { Link } from "../../components/Link";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";

export const Home = () => {
  const { auth } = useAuth();
  console.log({ auth });

  // FIXME: ログイン判定リダイレクトを共通化したい
  if (!auth) return <Navigate replace to="/login" />;

  return (
    <>
      <HeadingLevel1 text="書籍レビュー一覧" />
      <ul className="mt-8 flex flex-col gap-4">
        <li className="shadow-md p-8 rounded-md">
          <h2 className="text-xl">書籍タイトル</h2>
          <dl className="mt-4 text-sm">
            <div className="flex gap-2">
              <dt>URL:</dt>
              <dd>
                <Link to="https://example.com" text="https://example.com" />
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>レビュワー:</dt>
              <dd>山田太郎</dd>
            </div>
          </dl>
          <p className="mt-8">
            書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー
          </p>
        </li>
        <li className="shadow-md p-8 rounded-md">
          <h2 className="text-xl">書籍タイトル</h2>
          <dl className="mt-4 text-sm">
            <div className="flex gap-2">
              <dt>URL:</dt>
              <dd>
                <Link to="https://example.com" text="https://example.com" />
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>レビュワー:</dt>
              <dd>山田太郎</dd>
            </div>
          </dl>
          <p className="mt-8">
            書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー書籍レビュー
          </p>
        </li>
      </ul>
    </>
  );
};
