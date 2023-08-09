"use client";

import { useState } from "react";
import Location from "./Location";
import Toast from "../toast/Toast";
import WebcamComponent from "./Webcam";
import { useAppDispatch, useAppSelector } from "@/store";
import { FormState } from "@/types/types";
import { registerUser } from "@/store/features/formStateSlice";
import { UserList } from "../user-list";

export default function Form() {
  const [formState, setFormState] = useState<FormState>(null);
  const location = useAppSelector((state) => state.locationReducer.location);
  const image = useAppSelector((state) => state.webcamReducer.image);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: any) {
    // prevent default behavior
    e.preventDefault();

    if (location && image) {
      // create new formData and append the values
      const formData = new FormData();
      formData.append("deviceid", "sdfjsdghfsjdfjlsh");
      formData.append("lat", String(location?.latitude));
      formData.append("log", String(location?.longitude));
      formData.append("photo", image);

      // send the form data to backend

      // const res = await fetch(process.env.NEXT_PUBLIC_API_POST_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: formData,
      // });

      dispatch(
        registerUser({
          deviceid: "fdksgfksd",
          lat: String(location?.latitude),
          log: String(location?.longitude),
          photo: image,
        })
      );
      // // success

      // if (res.ok) {
      //   setFormState({
      //     status: "SUCCESS",
      //     message: "User information saved successfully",
      //   });
      //   console.log(res);
      //   // update redux store
      // }

      // // set server error

      // else {
      //   setFormState({
      //     status: "ERROR",
      //     type: "Server Error",
      //     message: "User information is not saved",
      //   });
      // }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Device Id
          <input name="deviceid" type="text"></input>
        </label>

        <button type="submit">Save</button>
      </form>
      <WebcamComponent />
      <Location />
      <Toast message="This is a toast message!" duration={3000} />
      <UserList />
    </div>
  );
}
