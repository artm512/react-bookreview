import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "../../components/Link";

import { api } from "../../utils/api";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";
import { ButtonPrimary } from "../../components/Button";
import { Loading } from "../../components/Loading";

type ReviewInfo = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

export const Detail = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>();

  const handleClickEdit = () => {
    navigate("/edit");
  };

  useEffect(() => {
    if (auth && id) {
      api
        .get(`/books/${id}`, {
          params: {
            id: `${id}`,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setReviewInfo(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [auth, id]);

  // FIXME: ログイン判定リダイレクトを共通化したい
  if (!auth) return <Navigate replace to="/login" />;

  return (
    <>
      {reviewInfo ? (
        <>
          <HeadingLevel1 text={reviewInfo.title} />
          <dl className="mt-4 text-sm">
            <div className="flex gap-2">
              <dt>URL:</dt>
              <dd>
                <Link to={reviewInfo.url} text={reviewInfo.url}></Link>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>レビュワー:</dt>
              <dd>{reviewInfo.reviewer}</dd>
            </div>
          </dl>
          <p className="mt-8">{reviewInfo.detail}</p>
          <p className="mt-8">{reviewInfo.review}</p>
          {reviewInfo.isMine && (
            <div className="mt-8">
              <ButtonPrimary onClick={handleClickEdit}>編集</ButtonPrimary>
            </div>
          )}
          <p className="mt-8">
            <Link to={"/"} text={"← レビュー一覧へ戻る"} />
          </p>
        </>
      ) : (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};
