import React, { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Typography, alpha } from "@mui/material";
import useSWR from "swr";
import { Loader } from "../shared/Loader";
import { getDevicePosReport, getTrackableObject } from "@/lib/tractive/api";
import { useSetDebugData } from "@/hooks/useDebug";
import { useAuth } from "@/hooks/useAuth";

interface IProps {
  petId: string;
}

const TractiveMap: FC<IProps> = ({ petId }) => {
  const auth = useAuth();

  const { data: trackableObjectData } = useSWR(
    {
      type: `trackable_objects-${petId}`,
      trackableObjectId: petId,
      authToken: auth.token,
    },
    getTrackableObject,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: devicePosReportData } = useSWR(
    {
      type: `device_pos_report-${trackableObjectData?.device_id}`,
      trackerId: trackableObjectData?.device_id,
      authToken: auth.token,
    },
    trackableObjectData?.device_id ? getDevicePosReport : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  useSetDebugData([
    {
      key: "trackableObject_TractiveMap",
      value: trackableObjectData,
      condition: !!trackableObjectData,
    },
    {
      key: "devicePosReport",
      value: devicePosReportData,
      condition: !!devicePosReportData,
    },
  ]);

  if (!trackableObjectData || !devicePosReportData) return <Loader />;

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <Typography
        variant="h1"
        align="center"
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: alpha("#000", 0.5),
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        Tracking: {trackableObjectData.details.name}
      </Typography>
      <MapContainer
        // center={[37.0902, -95.7192]}
        // bounds={[
        //   [24.396308, -125.0],
        //   [49.384358, -66.93457],
        // ]}
        center={[
          devicePosReportData.latlong[0],
          devicePosReportData.latlong[1],
        ]}
        bounds={[
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
        minZoom={3}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default TractiveMap;
