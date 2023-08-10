import { useAppDispatch, useAppSelector } from "@/store";
import {
  deviceIdError,
  imageError,
  locationError,
  reset,
  sending,
  serverError,
  success,
} from "@/store/features/formStateSlice";
import PrimaryButton from "../button/PrimaryButton";
import ButtonLoader from "../button/ButtonLoader";
import { deleteImage } from "@/store/features/webcamSlice";

export default function FormSubmitButton() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.formStateReducer.status);

  const image = useAppSelector((state) => state.webcamReducer.image);
  const location = useAppSelector((state) => state.locationReducer.location);
  const deviceId = useAppSelector((state) => state.webcamReducer.deviceId);

  const handleSubmit = async () => {
    // validate all the data
    if (!location) {
      dispatch(locationError());
      return false;
    }
    if (!image) {
      dispatch(imageError());
      return false;
    }
    if (!deviceId) {
      dispatch(deviceIdError());
      return false;
    } else {
      dispatch(sending());
      // create new formData and append the values
      const formData = new FormData();
      formData.append("deviceid", deviceId);
      formData.append("lat", String(location?.latitude));
      formData.append("log", String(location?.longitude));
      formData.append("photo", image);

      // send the form data to backend
      const res = await fetch(process.env.NEXT_PUBLIC_API_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      // on success update redux store
      if (res.ok) {
        dispatch(
          success({
            deviceid: deviceId,
            lat: String(location?.latitude),
            log: String(location?.longitude),
            photo: image,
          })
        );
        setTimeout(() => {
          dispatch(reset());
          dispatch(deleteImage());
        }, 500);
      }

      //on error set server error
      else {
        dispatch(serverError());
      }
    }
  };

  let enabled = !!(image && location && deviceId);

  let text = "Save";
  if (status === "SENT") text = "Success";
  if (status === "PENDING") {
    text = "Saving...";
    enabled = false;
  }
  if (status === "SERVER ERROR") {
    text = "Yikes!, Retry";
    enabled = true;
  }

  return (
    <PrimaryButton onClick={handleSubmit} disabled={!enabled}>
      <ButtonLoader loading={status === "PENDING"} />
      <span>{text}</span>
    </PrimaryButton>
  );
}
