import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";

import { api } from "../../utils/api";
import { InputText } from "../../components/InputText";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";
import { ButtonPrimary } from "../../components/Button";

type Inputs = {
  name: string;
};

export const Profile = () => {
  const { auth, userInfo, fetchUserInfo } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    await api
      .put(
        "/users",
        {
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(() => {
        setIsSuccess(true);
        fetchUserInfo();
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
        setErrorMessage(`ユーザー登録に失敗しました。${err}`);
      });
  };

  // FIXME: ログイン判定リダイレクトを共通化したい
  if (!auth) return <Navigate replace to="/login" />;

  return (
    <>
      <HeadingLevel1 text="ユーザー情報更新" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-8 mt-8"
      >
        {isSuccess && (
          <p className="bg-green-200 py-4 px-8">
            ユーザー情報が更新されました。
          </p>
        )}
        {errorMessage && <p className="bg-red-200 py-4 px-8">{errorMessage}</p>}
        <label className="w-6/12">
          氏名
          <InputText
            id="name"
            {...register("name", {
              required: "氏名を入力してください。",
            })}
            className="mt-2"
            defaultValue={userInfo.name}
          />
          {errors.name?.message && (
            <p className="text-red-500 mt-2">{errors.name?.message}</p>
          )}
        </label>
        <ButtonPrimary type="submit">更新</ButtonPrimary>
      </form>
    </>
  );
};
