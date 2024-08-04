import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import useSWR from "swr";
import {
  getBulkData,
  getTrackableObject,
  getTracker,
  mutateTrackerState,
} from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";
import { TrackerCommand } from "@/lib/tractive/api_utils";

interface IProps {
  petId: string;
}

export const ManageTrackerSection: FC<IProps> = ({ petId }) => {
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

  const { data: trackerData } = useSWR(
    {
      type: `tracker-${trackableObjectData?.device_id}`,
      trackerId: trackableObjectData?.device_id,
      authToken: auth.token,
    },
    getTracker,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: bulkData, mutate: mutateBulkData } = useSWR(
    {
      type: `bulk_data-${trackableObjectData?.device_id}`,
      wantedItems: [
        {
          id: `${trackableObjectData?.device_id}_live_tracking`,
          type: "tracker_command_state",
        },
        {
          id: `${trackableObjectData?.device_id}_led_control`,
          type: "tracker_command_state",
        },
        {
          id: `${trackableObjectData?.device_id}_buzzer_control`,
          type: "tracker_command_state",
        },
      ],
      authToken: auth.token,
    },
    trackableObjectData?.device_id ? getBulkData : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const liveTrackingState = useMemo(
    () =>
      bulkData?.find(
        (item) =>
          item._id === `${trackableObjectData?.device_id}_live_tracking`,
      )?.active,
    [bulkData, trackableObjectData?.device_id],
  );

  const ledState = useMemo(
    () =>
      bulkData?.find(
        (item) => item._id === `${trackableObjectData?.device_id}_led_control`,
      )?.active,
    [bulkData, trackableObjectData?.device_id],
  );

  const buzzerState = useMemo(
    () =>
      bulkData?.find(
        (item) =>
          item._id === `${trackableObjectData?.device_id}_buzzer_control`,
      )?.active,
    [bulkData, trackableObjectData?.device_id],
  );

  useMutateDebugState("tracker", trackerData);
  useMutateDebugState("bulkData", bulkData);

  if (!trackableObjectData || !trackerData || !bulkData) return null;

  return (
    <Card
      sx={{
        width: "fit-content",
        marginBottom: 2,
      }}
    >
      <CardHeader
        title="Manage tracker"
        subheader="Control the tracker of your pet"
      />

      <CardContent>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              mutateTrackerState({
                trackerId: trackableObjectData.device_id,
                commandId: TrackerCommand.LedControl,
                command: !ledState,
                authToken: auth.token,
              });
              mutateBulkData();
            }}
          >
            {ledState ? "Turn off" : "Turn on"} LED
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              mutateTrackerState({
                trackerId: trackableObjectData.device_id,
                commandId: TrackerCommand.BuzzerControl,
                command: !buzzerState,
                authToken: auth.token,
              });
              mutateBulkData();
            }}
          >
            {buzzerState ? "Turn off" : "Turn on"} Buzzer
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              mutateTrackerState({
                trackerId: trackableObjectData.device_id,
                commandId: TrackerCommand.LiveTracking,
                command: !liveTrackingState,
                authToken: auth.token,
              });
              mutateBulkData();
            }}
          >
            {liveTrackingState ? "Stop" : "Start"} live tracking
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
