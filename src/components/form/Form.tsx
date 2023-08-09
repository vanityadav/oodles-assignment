"use client";

import Location from "./Location";
import { useState } from "react";
import { FormState } from "@/types/types";
import WebcamComponent from "./Webcam";

export default function Form() {
  const [formState, setFormState] = useState<FormState>(null);

  async function handleSubmit(e: any) {
    // prevent default behavior
    e.preventDefault();

    // if location is not available throw an error
    if (position) {
      // create new formData and append the values
      const formData = new FormData();
      formData.append("deviceid", "sdhfjlshdjkl");
      formData.append("lat", String(position?.latitude));
      formData.append("log", String(position?.longitude));
      formData.append("photo", "sdhfjlshdjkl");

      // send the form data to backend
      const res = await fetch(process.env.NEXT_PUBLIC_API_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      // success
      if (res.ok) {
        setFormState({
          status: "SUCCESS",
          message: "User information saved successfully",
        });
        // update redux store
      }

      // set server error
      else {
        setFormState({
          status: "ERROR",
          type: "Server Error",
          message: "User information is not saved",
        });
      }
    } else {
      setFormState({
        status: "ERROR",
        type: "Location",
        message: "Provide Location Access to this site",
      });
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
    </div>
  );
}
