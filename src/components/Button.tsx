import { ButtonHTMLAttributes, ReactNode } from "react";

export const ButtonPrimary = ({
  children,
  ...props
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
    {...props}
  >
    {children}
  </button>
);

export const ButtonSecondary = ({
  children,
  ...props
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </button>
);

export const ButtonError = ({
  children,
  ...props
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
    {...props}
  >
    {children}
  </button>
);
