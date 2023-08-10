import React, { useState, useEffect } from "react";

type Props = {
  message: string;
  duration?: number;
  type?: "default" | "error" | "success";
};

export default function Toast({
  message,
  duration = 3000,
  type = "default",
}: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  console.log(visible);

  if (type === "error")
    return (
      <div
        className={` fixed bottom-6  right-6 p-4  bg-red-400 shadow-md border rounded-lg select-none transition-all duration-500 z-[999999] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="">{message}</div>
      </div>
    );
  if (type === "default")
    return (
      <div
        className={` fixed bottom-6  right-6 p-4  bg-white shadow-md border rounded-lg select-none transition-all duration-500 z-[999999] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="">{message}</div>
      </div>
    );
  if (type === "success")
    return (
      <div
        className={` fixed bottom-6  right-6 p-4  bg-green-400 shadow-md border rounded-lg select-none transition-all duration-500 z-[999999] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="">{message}</div>
      </div>
    );
}
