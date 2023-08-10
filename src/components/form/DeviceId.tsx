import React from "react";
import { useAppSelector } from "@/store";
import { DeviceIcon } from "@/icons/Icons";

export default function DeviceId() {
  const deviceId = useAppSelector((state) => state.webcamReducer.deviceId);
  const cameraDevice = useAppSelector((state) => state.webcamReducer.supported);
  if (deviceId)
    return (
      <div className="flex gap-2 items-center text-gray-400 text-sm break-all">
        <DeviceIcon />
        {deviceId}
      </div>
    );
  if (!cameraDevice)
    return (
      <p className="text-red-500">
        Camera device not found or provide camera access
      </p>
    );
}
