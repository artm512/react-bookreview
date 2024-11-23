import { useForm, SubmitHandler } from "react-hook-form";

import "./index.css";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  icon: FileList;
};

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
    // 成功したら、生成された認証用のトークンを設定し、画像を圧縮して別のAPIでアイコン画像をPOSTする
    // エラーだった場合、エラー文言を表示させる
    // 全て成功したら、tokenをローカルストレージに保存して、ログイントップに遷移させる
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
