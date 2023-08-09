import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const [imageSrc, setImageSrc] = React.useState();

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);
  return (
    <>
      <Webcam
        className=""
        height={720}
        ref={webcamRef}
        width={1280}
        onUserMediaError={() => console.log("No camera")}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <div>
        <img src={imageSrc} />
      </div>
    </>
  );
};
export default WebcamCapture;
