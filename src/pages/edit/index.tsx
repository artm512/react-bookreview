import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "../../utils/api";
import { InputText } from "../../components/InputText";
import { InputTextarea } from "../../components/InputTextarea";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";
import { ButtonPrimary, ButtonError } from "../../components/Button";
import { Loading } from "../../components/Loading";
import type { ReviewInfo } from "../detail";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export const Edit = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleClickDelete = () => {
    const checkDelete = window.confirm("投稿を削除してもよろしいですか？");
    if (!checkDelete) return;

    api
      .delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
        setErrorMessage(`レビューの削除に失敗しました。${err}`);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    await api
      .put(
        `/books/${id}`,
        {
          title: data.title,
          url: data.url,
          detail: data.detail,
          review: data.review,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(() => {
        navigate(`/detail/${id}`);
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
        setErrorMessage(`レビューの編集に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    if (auth && id) {
      api
        .get(`/books/${id}`, {
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
      <HeadingLevel1 text="新規レビュー投稿" />
      {reviewInfo ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-8 mt-8"
          >
            {errorMessage && (
              <p className="bg-red-200 py-4 px-8">{errorMessage}</p>
            )}
            <label className="w-6/12">
              タイトル
              <InputText
                {...register("title", {
                  required: "タイトルを入力してください。",
                })}
                className="mt-2"
                defaultValue={reviewInfo?.title}
              />
              {errors.title?.message && (
                <p className="text-red-500 mt-2">{errors.title?.message}</p>
              )}
            </label>
            <label className="w-6/12">
              URL
              <InputText
                {...register("url", {
                  required: "URLを入力してください。",
                })}
                className="mt-2"
                defaultValue={reviewInfo?.url}
              />
              {errors.url?.message && (
                <p className="text-red-500 mt-2">{errors.url?.message}</p>
              )}
            </label>
            <label className="w-6/12">
              詳細
              <InputTextarea
                {...register("detail", {
                  required: "詳細を入力してください。",
                })}
                className="mt-2"
                defaultValue={reviewInfo?.detail}
              />
              {errors.detail?.message && (
                <p className="text-red-500 mt-2">{errors.detail?.message}</p>
              )}
            </label>
            <label className="w-6/12">
              レビュー
              <InputTextarea
                {...register("review", {
                  required: "詳細を入力してください。",
                })}
                className="mt-2"
                defaultValue={reviewInfo?.review}
              />
              {errors.review?.message && (
                <p className="text-red-500 mt-2">{errors.review?.message}</p>
              )}
            </label>
            <div className="flex gap-2">
              <ButtonPrimary type="submit">編集</ButtonPrimary>
              <ButtonError type="button" onClick={handleClickDelete}>
                削除
              </ButtonError>
            </div>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
