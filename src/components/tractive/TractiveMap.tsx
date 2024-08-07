import React, { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useSWR from "swr";
import { Loader } from "../shared/Loader";
import { MapGeofence } from "./MapGeofence";
import { getDevicePosReport, getTrackableObject } from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";
import { BulkItem } from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  geofences: BulkItem[];
}

const TractiveMap: FC<IProps> = ({ petId, geofences }) => {
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

  const trackerId = trackableObjectData?.device_id;

  const { data: devicePosReportData } = useSWR(
    {
      type: `device_pos_report-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getDevicePosReport : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  useMutateDebugState("geofences", geofences);
  useMutateDebugState("trackableObject", trackableObjectData);
  useMutateDebugState("devicePosReport", devicePosReportData);
  useMutateDebugState("devicePosReport", devicePosReportData);

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
          position={[
            devicePosReportData.latlong[0],
            devicePosReportData.latlong[1],
          ]}
        />

        {geofences.map((geofence) => (
          <MapGeofence key={geofence._id} geofence={geofence} />
        ))}
      </MapContainer>
    </React.Fragment>
  );
};

export default TractiveMap;
