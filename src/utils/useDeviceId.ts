export default function useDeviceId() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
  } else {
    // List cameras and microphones.
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(
            `${device.kind}: ${device.label} id = ${device.deviceId}`
          );
        });
      })
      .catch((err) => {
        console.log(`${err.name}: ${err.message}`);
      });
  }
}
