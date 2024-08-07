import React, { FC } from "react";
import { Circle, Polygon } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { BulkItem } from "@/lib/tractive/api_types";

interface IProps {
  geofence: BulkItem;
}

export const MapGeofence: FC<IProps> = ({ geofence }) => {
  if (!geofence.coords || !geofence.shape || !geofence.radius) return null;

  const color = geofence.fence_type === "SAFE" ? "green" : "red";

  if (geofence.shape === "CIRCLE") {
    return (
      <Circle
        center={geofence.coords as unknown as LatLngExpression}
        pathOptions={{ color }}
        radius={geofence.radius}
      />
    );
  }

  if (geofence.shape === "POLYGON") {
    return (
      <Polygon
        pathOptions={{ color }}
        positions={geofence.coords as LatLngExpression[]}
      />
    );
  }

  return null;
};
