import { forwardRef, TextareaHTMLAttributes } from "react";

interface InputTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>(({ hasError = false, className, ...props }, ref) => {
  console.log({ hasError }); // TODO: バリデーションスタイル用

  const defaultClassName =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600";
  const combinedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return <textarea ref={ref} className={combinedClassName} {...props} />;
});
