import { useAppDispatch, useAppSelector } from "@/store";
import { cameraError, saveImage } from "@/store/features/webcamSlice";
import React, { useState, useRef } from "react";

export default function CameraComponent() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();
  const imageBlob = useAppSelector((state) => state.webcamReducer.image);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (!stream) {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      dispatch(cameraError());
      alert("Error accessing camera. Please check your camera permissions.");
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        dispatch(saveImage(blob));
      }
    });
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <button onClick={openCamera}>Open Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={closeCamera}>Close Camera</button>
      {imageBlob && (
        <div>
          <h2>Preview</h2>
          <img src={URL.createObjectURL(imageBlob)} alt="Captured" />
        </div>
      )}
      <video ref={videoRef} playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
