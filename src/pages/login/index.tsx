import { useForm, SubmitHandler } from "react-hook-form";

import "./index.css";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    // 入力データをポストする
    // レスポンスのトークンをローカルストレージに保存して、ログイントップ画面へ遷移
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
      </form>
    </>
  );
};
