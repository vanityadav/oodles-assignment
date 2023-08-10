"use client";
import { useAppSelector } from "@/store";
import React from "react";
import Toast from "./Toast";

export default function Notifications() {
  const status = useAppSelector((state) => state.formStateReducer.status);
  const statusText = useAppSelector(
    (state) => state.formStateReducer.statusText
  );
  if (status?.endsWith("ERROR"))
    return <Toast message={statusText} type="error" />;
  if (status === "SENT") return <Toast message={statusText} type="success" />;
}
