import React, { useState } from "react";

const CameraComponent = () => {
  const [stream, setStream] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const videoRef = React.createRef();
  const canvasRef = React.createRef();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setImageBlob(blob);
    });
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={stopCamera}>Stop Camera</button>
      {imageBlob && (
        <div>
          <h2>Preview</h2>
          <img src={URL.createObjectURL(imageBlob)} alt="Captured" />
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraComponent;
