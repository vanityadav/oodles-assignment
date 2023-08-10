import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setLocation,
  notSupported,
  notAllowed,
} from "@/store/features/locationSlice";

export default function useGeoLocationApi() {
  const dispatch = useAppDispatch();
  const position = useAppSelector((state) => state.locationReducer);

  useEffect(() => {
    const handlePosition = (position: GeolocationPosition) => {
      // save location to slice
      dispatch(
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    };

    //get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition, () =>
        dispatch(notAllowed())
      );
    } else {
      //  if geolocation is not supported show error
      dispatch(notSupported());
    }
  }, [dispatch]);
  return position;
}
