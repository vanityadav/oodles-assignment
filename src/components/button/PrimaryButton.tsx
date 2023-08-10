import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-white border rounded-lg py-1 px-5 w-fit shadow-md transition-all  flex items-center justify-between gap-2 disabled:text-gray-400 ${
        disabled ? "" : "hover:bg-lightPrimary hover:cursor-pointer"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
