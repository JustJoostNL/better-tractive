import React, { FC } from "react";
import { Circle, Polygon, Rectangle } from "react-leaflet";
import { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { BulkItem } from "@/lib/tractive/api_types";

interface IProps {
  geofence: BulkItem;
}

export const MapGeofence: FC<IProps> = ({ geofence }) => {
  if (!geofence.coords || !geofence.shape || !geofence.radius) return null;

  const color =
    geofence.fence_type === "SAFE"
      ? "green"
      : geofence.fence_type === "DANGER"
        ? "red"
        : "grey";

  if (geofence.shape === "CIRCLE") {
    return (
      <Circle
        center={geofence.coords as unknown as LatLngExpression}
        pathOptions={{ color }}
        radius={geofence.radius}
      />
    );
  }

  if (geofence.shape === "RECTANGLE") {
    return (
      <Rectangle
        bounds={geofence.coords as LatLngBoundsExpression}
        pathOptions={{ color }}
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
