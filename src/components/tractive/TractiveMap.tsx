import React, { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Typography } from "@mui/material";
import { Loader } from "../shared/Loader";
import { MapGeofence } from "./MapGeofence";
import {
  BulkItem,
  IDevicePosReportResponse,
  ITrackableObjectResponse,
} from "@/lib/tractive/api_types";
import { tractiveBaseUrl } from "@/lib/tractive/api_utils";
import { mediaResourcePath } from "@/lib/tractive/api_paths";

interface IProps {
  trackableObjectData: ITrackableObjectResponse;
  devicePosReportData: IDevicePosReportResponse;
  geofences: BulkItem[];
}

const TractiveMap: FC<IProps> = ({
  geofences,
  trackableObjectData,
  devicePosReportData,
}) => {
  if (!trackableObjectData || !devicePosReportData) return <Loader />;

  return (
    <React.Fragment>
      <MapContainer
        center={[
          devicePosReportData.latlong[0],
          devicePosReportData.latlong[1],
        ]}
        maxBounds={[
          [
            devicePosReportData.latlong[0] - 0.1,
            devicePosReportData.latlong[1] - 0.1,
          ],
          [
            devicePosReportData.latlong[0] + 0.1,
            devicePosReportData.latlong[1] + 0.1,
          ],
        ]}
        zoom={20}
        minZoom={13}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />

        <Marker
          icon={L.icon({
            iconUrl:
              tractiveBaseUrl +
              mediaResourcePath(
                trackableObjectData.details.profile_picture_id,
                { width: 50, height: 50 },
              ),
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50],
          })}
          position={[
            devicePosReportData.latlong[0],
            devicePosReportData.latlong[1],
          ]}
        >
          <Popup>
            <Typography variant="h6">
              {trackableObjectData.details.name}
            </Typography>
          </Popup>
        </Marker>

        {geofences.map((geofence) => (
          <MapGeofence key={geofence._id} geofence={geofence} />
        ))}
      </MapContainer>
    </React.Fragment>
  );
};

export default TractiveMap;
