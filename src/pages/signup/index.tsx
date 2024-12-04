import "./index.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosResponse } from "axios";
import Compressor from "compressorjs";

import { api } from "../../utils/api";

type Inputs = {
  name: string;
  email: string;
  password: string;
  icon: FileList;
};

export const Signup = () => {
  const [imageData, setImageData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
          const file = data.icon?.[0];
          if (!file) return;

          // アイコン画像を圧縮。
          new Compressor(file, {
            quality: 0.6,
            success(result) {
              const formData = new FormData();
              formData.append("icon", result);
              console.log({ result });

              // アイコン画像をPOSTする
              api
                .post("/uploads", formData, {
                  headers: {
                    Authorization: `Bearer ${res?.data?.token}`,
                  },
                })
                .then(() => {
                  // TODO: tokenをローカルストレージ or cookie に保存
                  // TODO: ログイントップに遷移させる
                  console.log("success!!!");
                })
                .catch((err) => {
                  // FIXME: エラー文言を表示させる
                  console.error(err);
                  setErrorMessage(`アイコン画像登録に失敗しました。${err}`);
                });
            },
            error(err) {
              console.log(err.message);
              setErrorMessage(`アイコン画像の圧縮に失敗しました。${err}`);
            },
          });
        }
      })
      .catch((err) => {
        // FIXME: エラー文言を表示させる
        console.error(err);
        setErrorMessage(`ユーザー登録に失敗しました。${err}`);
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
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};
