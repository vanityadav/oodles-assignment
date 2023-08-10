import { LocationIcon } from "@/icons/Icons";
import { useGeoLocationApi } from "@/utils";
import React from "react";

export default function Location() {
  const geoApi = useGeoLocationApi();

  if (geoApi.location)
    return (
      <div className="flex gap-2 items-center text-gray-400 text-sm">
        <LocationIcon />
        {geoApi.location.latitude}, {geoApi.location.longitude}
      </div>
    );
  if (!geoApi.supported)
    return <p className="text-red-500 ">GPS not supported</p>;
  if (!geoApi.locationAccess)
    return <p className="text-red-500 ">Enable Location Services</p>;
  return <p>Fetching Location....</p>;
}
