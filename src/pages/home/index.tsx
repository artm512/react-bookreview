import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "../../components/Link";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";
import { api } from "../../utils/api";
import { Pagination } from "../../components/Pagination";

type bookReview = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

export const Home = () => {
  const ONE_PAGE_DISPLAY_REVIEW = 10;
  const { auth } = useAuth();
  const [cookies] = useCookies();
  const [bookReviews, setBookReviews] = useState<bookReview[]>([]);
  const [booksOffset, setBooksOffset] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (auth) {
      api
        .get("/books", {
          params: {
            offset: `${booksOffset}`,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setBookReviews(res.data);
        })
        .catch((err) => {
          setErrorMessage(`リストの取得に失敗しました。${err}`);
        });
    }
  }, [auth, booksOffset]);

  // FIXME: ログイン判定リダイレクトを共通化したい
  if (!auth) return <Navigate replace to="/login" />;

  return (
    <>
      <HeadingLevel1 text="書籍レビュー一覧" />
      {errorMessage && (
        <p className="bg-red-200 py-4 px-8 mt-8">{errorMessage}</p>
      )}
      <ul className="mt-8 flex flex-col gap-4">
        {bookReviews.map((review) => (
          <li className="shadow-md p-8 rounded-md" key={review.id}>
            <h2 className="text-xl">{review.title}</h2>
            <dl className="mt-4 text-sm">
              <div className="flex gap-2">
                <dt>URL:</dt>
                <dd>
                  <Link to={review.url} text={review.url} />
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>レビュワー:</dt>
                <dd>{review.reviewer}</dd>
              </div>
            </dl>
            <p className="mt-8">{review.review}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Pagination
          setOffset={setBooksOffset}
          offset={booksOffset}
          pageDisplayNum={ONE_PAGE_DISPLAY_REVIEW}
        />
      </div>
    </>
  );
};
