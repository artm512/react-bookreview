import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import "./index.css";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

// FIXME: 共通化してtokenも共通管理できるようにする
const api = axios.create({
  baseURL: "https://railway.bookreview.techtrain.dev",
  timeout: 2000,
});

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
        // TODO: レスポンスのトークンをローカルストレージ or cookieに保存して、ログイントップ画面へ遷移
        console.log("login success!!! ", res.data.token);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          メールアドレス
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "メールアドレスを入力してください。",
            })}
          />
        </label>
        {errors.email?.message && (
          <p className="errorMessage">{errors.email?.message}</p>
        )}
        <label>
          パスワード
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "パスワードを入力してください。",
            })}
          />
        </label>
        {errors.password?.message && (
          <p className="errorMessage">{errors.password?.message}</p>
        )}
        <button type="submit">ログイン</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};
