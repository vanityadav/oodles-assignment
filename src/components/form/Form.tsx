"use client";

import Webcam from "./Webcam";
import Location from "./Location";
import FormSubmitButton from "./FormSubmitButton";

export default function Form() {
  return (
    <div className="flex flex-col border">
      <Webcam />
      <Location />
      <FormSubmitButton />
    </div>
  );
}
