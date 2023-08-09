import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setLocation,
  notAllowed,
  notSupported,
} from "@/store/features/locationSlice";

export default function useGeoLocationApi() {
  const dispatch = useAppDispatch();
  const position = useAppSelector((state) => state.locationReducer);

  useEffect(() => {
    function handlePosition(position: GeolocationPosition) {
      if (position) {
        dispatch(
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      } else {
        dispatch(notAllowed());
      }
    }
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(handlePosition);
    else {
      dispatch(notSupported());
    }
  }, [dispatch]);
  return position;
}
