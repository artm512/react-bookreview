import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "../../utils/api";
import { InputText } from "../../components/InputText";
import { InputTextarea } from "../../components/InputTextarea";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";
import { ButtonPrimary } from "../../components/Button";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export const New = () => {
  const { auth } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    await api
      .post(
        "/books",
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
        setIsSuccess(true);
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
        setErrorMessage(`レビューの投稿に失敗しました。${err}`);
      });
  };

  // FIXME: ログイン判定リダイレクトを共通化したい
  if (!auth) return <Navigate replace to="/login" />;

  return (
    <>
      <HeadingLevel1 text="新規レビュー投稿" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-8 mt-8"
      >
        {isSuccess && (
          <p className="bg-green-200 py-4 px-8">レビューが投稿されました。</p>
        )}
        {errorMessage && <p className="bg-red-200 py-4 px-8">{errorMessage}</p>}
        <label className="w-6/12">
          タイトル
          <InputText
            {...register("title", {
              required: "タイトルを入力してください。",
            })}
            className="mt-2"
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
          />
          {errors.review?.message && (
            <p className="text-red-500 mt-2">{errors.review?.message}</p>
          )}
        </label>
        <ButtonPrimary type="submit">投稿</ButtonPrimary>
      </form>
    </>
  );
};
