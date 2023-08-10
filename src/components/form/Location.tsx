import { useGeoLocationApi } from "@/utils";
import React from "react";

export default function Location() {
  const geoApi = useGeoLocationApi();

  if (geoApi.location)
    return (
      <div>
        <p>Latitude- {geoApi.location.latitude}</p>
        <p>Longitude- {geoApi.location.longitude}</p>
      </div>
    );
  if (!geoApi.supported) return <div>GPS not supported</div>;
  if (!geoApi.locationAccess) return <div>Enable Location Services</div>;
  return <div>Fetching Location</div>;
}
