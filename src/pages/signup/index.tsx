import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import "./index.css";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  icon: FileList;
};

// FIXME: 共通化してtokenも共通管理できるようにする
const api = axios.create({
  baseURL: "https://railway.bookreview.techtrain.dev",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

export const Signup = () => {
  const [imageData, setImageData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file == null) {
      setImageData("");
      return;
    }

    // FileReaderクラスのインスタンスを取得
    const fileReader = new FileReader();
    // プレビュー画像を反映
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    // 入力データをPOSTする
    await api
      .post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(async (res: AxiosResponse<{ token: string }>) => {
        // TODO: 成功したら、生成された認証用のトークンを設定
        console.log("token: ", res.data.token);

        if (data.icon.length > 0) {
          // TODO: アイコン画像を圧縮。

          // アイコン画像をPOSTする
          await api
            .post(
              "/uploads",
              {
                iconUrl: imageData,
              },
              {
                headers: {
                  Authorization: `Bearer ${res?.data?.token}`,
                },
              }
            )
            .then(() => {
              // TODO: tokenをローカルストレージに保存
              // TODO: ログイントップに遷移させる
            })
            .catch((err) => {
              // FIXME: エラー文言を表示させる
              console.error(err);
            });
        }
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
      });
  };

  return (
    <>
      <h2>ユーザー新規登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          氏名
          <input
            type="name"
            id="name"
            {...register("name", {
              required: "氏名を入力してください。",
            })}
          />
        </label>
        {errors.name?.message && (
          <p className="errorMessage">{errors.name?.message}</p>
        )}
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
        <label>
          アイコン画像
          <input
            type="file"
            id="icon"
            accept="image/*"
            {...register("icon")}
            onChange={handleChangeIcon}
          />
        </label>
        <img src={imageData} alt="" />
        <button type="submit">登録</button>
      </form>
    </>
  );
};
