import { useAppDispatch, useAppSelector } from "@/store";
import {
  notDevicesFound,
  saveImage,
  setDeviceId,
} from "@/store/features/webcamSlice";
import Image from "next/image";
import React, { useState, useRef } from "react";
import PrimaryButton from "../button/PrimaryButton";

export default function Webcam() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();
  const imageBlob = useAppSelector((state) => state.webcamReducer.image);
  const deviceId = useAppSelector((state) => state.webcamReducer.deviceId);
  const cameraDevice = useAppSelector((state) => state.webcamReducer.supported);

  const openCamera = async () => {
    // check if there are any video devices available
    try {
      const saveDeviceID = (devices: MediaDeviceInfo[]) => {
        devices.forEach((device) => {
          if (device.kind === "videoinput") {
            dispatch(setDeviceId(device.deviceId));
          }
        });
      };

      // get device id and save it to slice
      navigator.mediaDevices.enumerateDevices().then(saveDeviceID);

      // turn on video stream
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // check is video stream is available
      if (!stream) {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      }
    } catch (error) {
      // device not found or access denied
      dispatch(notDevicesFound());
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // show the captured image
    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // convert the steam to blob and in webp format
    canvas.toBlob(
      (blob) => {
        if (blob) {
          dispatch(saveImage(blob));
        }
      },
      "image/webp",
      0.8
    );
  };

  const closeCamera = () => {
    // close the video stream and device camera
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <PrimaryButton onClick={openCamera}>Open Camera</PrimaryButton>
        <PrimaryButton onClick={takePhoto}>Take Photo</PrimaryButton>
        <PrimaryButton onClick={closeCamera}>Close Camera</PrimaryButton>
      </div>
      {imageBlob && (
        <div>
          <h2>Preview</h2>
          <Image src={URL.createObjectURL(imageBlob)} alt="Captured" />
        </div>
      )}
      <video ref={videoRef} playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      {cameraDevice ? <p>Device id -{deviceId}</p> : <p>No devices Found</p>}
    </div>
  );
}
