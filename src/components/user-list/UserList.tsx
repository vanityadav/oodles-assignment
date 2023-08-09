import { useAppSelector } from "@/store";
import React from "react";

export default function UserList() {
  const users = useAppSelector((state) => state.formStateReducer.userData);
  return (
    <div>
      {users &&
        users?.map((ele, i) => (
          <div key={i}>
            <img src={URL.createObjectURL(ele.photo)} alt="Captured" />
            <p>lat- {ele.lat}</p>
            <p>log- {ele.log}</p>
            <p>Device Id- {ele.deviceid}</p>
          </div>
        ))}
    </div>
  );
}
