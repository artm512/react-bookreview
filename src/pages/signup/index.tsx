import "./index.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosResponse } from "axios";
import Compressor from "compressorjs";

import { api } from "../../utils/api";
import { InputText } from "../../components/InputText";
import { HeadingLevel1 } from "../../components/Heading";

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
      <HeadingLevel1 text="ユーザー新規登録" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-8 mt-8"
      >
        {errorMessage && <p className="bg-red-200 py-4 px-8">{errorMessage}</p>}
        <label className="w-6/12">
          氏名
          <InputText
            id="name"
            {...register("name", {
              required: "氏名を入力してください。",
            })}
            className="mt-2"
          />
          {errors.name?.message && (
            <p className="text-red-500 mt-2">{errors.name?.message}</p>
          )}
        </label>
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
        <div className="w-8/12">
          <label className="flex flex-col">
            <span>アイコン画像</span>
            <input
              type="file"
              id="icon"
              accept="image/*"
              {...register("icon")}
              onChange={handleChangeIcon}
              className="mt-2"
            />
          </label>
          <img src={imageData} alt="" />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          登録
        </button>
      </form>
    </>
  );
};
