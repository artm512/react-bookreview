import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import { api } from "../../utils/api";
import { InputText } from "../../components/InputText";
import { HeadingLevel1 } from "../../components/Heading";
import { useAuth } from "../../providers/AuthProvider";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    // 入力データをポストする
    await api
      .post("/signin", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log("login success!!! ", res.data.token);
        setCookie("token", res.data.token);
        setAuth(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate replace to="/" />;

  return (
    <>
      <HeadingLevel1 text="ログイン" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-8 mt-8"
      >
        {errorMessage && <p className="bg-red-200 py-4 px-8">{errorMessage}</p>}
        <label className="w-6/12">
          メールアドレス
          <InputText
            type="email"
            id="email"
            {...register("email", {
              required: "メールアドレスを入力してください。",
            })}
            className="mt-2"
          />
          {errors.email?.message && (
            <p className="text-red-500 mt-2">{errors.email?.message}</p>
          )}
        </label>
        <label className="w-6/12">
          パスワード
          <InputText
            type="password"
            id="password"
            {...register("password", {
              required: "パスワードを入力してください。",
            })}
            className="mt-2"
          />
          {errors.password?.message && (
            <p className="text-red-500 mt-2">{errors.password?.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          ログイン
        </button>
      </form>
    </>
  );
};
