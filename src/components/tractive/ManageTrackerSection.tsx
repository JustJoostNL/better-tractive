import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { KeyedMutator } from "swr";
import { Stat } from "../shared/Stat";
import { LedStateButton } from "./LedStateButton";
import { BuzzerStateButton } from "./BuzzerStateButton";
import { LiveTrackingStateButton } from "./LiveTrackingStateButton";
import {
  IBulkResponse,
  ITrackableObjectResponse,
  ITrackerResponse,
} from "@/lib/tractive/api_types";

interface IProps {
  trackableObjectData: ITrackableObjectResponse;
  trackerData: ITrackerResponse;
  bulkData: IBulkResponse;
  mutateBulkData: KeyedMutator<IBulkResponse>;
}

export const ManageTrackerSection: FC<IProps> = ({
  trackableObjectData,
  trackerData,
  bulkData,
  mutateBulkData,
}) => {
  const virtualFencesCount = useMemo(
    () => bulkData.filter((item) => item._type === "geofence").length,
    [bulkData],
  );

  if (!trackableObjectData || !bulkData) return null;

  return (
    <Card>
      <CardHeader
        title="Manage tracker"
        subheader="Control the tracker of your pet"
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} direction="row">
          <LedStateButton
            bulkData={bulkData}
            mutateBulkData={mutateBulkData}
            trackerId={trackableObjectData.device_id}
          />

          <BuzzerStateButton
            bulkData={bulkData}
            mutateBulkData={mutateBulkData}
            trackerId={trackableObjectData.device_id}
          />

          <LiveTrackingStateButton
            bulkData={bulkData}
            mutateBulkData={mutateBulkData}
            trackerId={trackableObjectData.device_id}
          />
        </Stack>

        <Stack
          spacing={3}
          mt={3}
          rowGap={2}
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          maxWidth={400}
        >
          <Stat title="Tracker ID" value={trackableObjectData.device_id} />
          <Stat title="Model number" value={trackerData.model_number} />
          <Stat
            title="Charging"
            value={trackerData.charging_state === "CHARGING" ? "Yes" : "No"}
          />
          <Stat title="Battery state" value={trackerData.battery_state} />
          <Stat
            title="Power saving"
            value={trackerData.state_reason === "POWER_SAVING" ? "Yes" : "No"}
          />
          <Stat title="Virtual fences" value={virtualFencesCount} />
        </Stack>
      </CardContent>
    </Card>
  );
};
