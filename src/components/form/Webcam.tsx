import { useAppDispatch, useAppSelector } from "@/store";
import {
  deleteImage,
  notDevicesFound,
  saveImage,
  setDeviceId,
} from "@/store/features/webcamSlice";
import React, { useState, useRef } from "react";
import PrimaryButton from "../button/PrimaryButton";

export default function Webcam() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [camera, setCamera] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();
  const imageBlob = useAppSelector((state) => state.webcamReducer.image);
  // const deviceId = useAppSelector((state) => state.webcamReducer.deviceId);
  // const cameraDevice = useAppSelector((state) => state.webcamReducer.supported);

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
        setCamera(true);
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
      setCamera(false);
      setStream(null);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <PrimaryButton onClick={openCamera}>Open Camera</PrimaryButton>
      </div>
      <div
        className={`fixed inset-0 flex items-center z-30 ${
          camera ? "flex" : "hidden"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCamera();
        }}
      >
        <div className="flex flex-col bg-white p-4 gap-2 m-auto rounded-lg sm:w-1/2 w-[90%] ">
          <div className="flex items-center gap-2 justify-between">
            {imageBlob ? (
              <div className="flex items-center gap-2">
                <PrimaryButton onClick={closeCamera}>Save</PrimaryButton>
                <PrimaryButton onClick={() => dispatch(deleteImage())}>
                  Retake
                </PrimaryButton>
              </div>
            ) : (
              <PrimaryButton onClick={takePhoto}>Capture</PrimaryButton>
            )}
            <PrimaryButton onClick={closeCamera}>Close</PrimaryButton>
          </div>
          <div className="relative w-full">
            {imageBlob && (
              <>
                <h2>Image Preview</h2>
                <img
                  src={URL.createObjectURL(imageBlob)}
                  alt="Captured"
                  className="absolute inset-0 z-50 "
                />
              </>
            )}

            <video
              ref={videoRef}
              playsInline
              muted
              className="hover:cursor-copy absolute inset-0"
              onClick={takePhoto}
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
