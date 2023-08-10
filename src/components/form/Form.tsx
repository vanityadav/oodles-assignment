"use client";

import Webcam from "./Webcam";
import Location from "./Location";
import FormSubmitButton from "./FormSubmitButton";
import DeviceId from "./DeviceId";

export default function Form() {
  return (
    <div className="flex flex-col gap-3 py-8">
      <div className="flex flex-col gap-3 ">
        <Webcam />
        <FormSubmitButton />
      </div>
      <div className="text-gray-400 text-sm flex flex-col gap-1">
        <DeviceId />
        <Location />
      </div>
      <div className="border-b mt-4"></div>
    </div>
  );
}
