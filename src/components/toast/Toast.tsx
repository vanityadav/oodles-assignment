import React, { useState, useEffect } from "react";
import "./toast.css";

type Props = {
  message: string;
  duration?: number;
};

export default function Toast({ message, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div className={`toast ${visible ? "visible" : ""}`}>
      <div className="toast-content">{message}</div>
    </div>
  );
}
