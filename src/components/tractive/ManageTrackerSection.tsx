import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { FC } from "react";
import { KeyedMutator } from "swr";
import { LedStateButton } from "./LedStateButton";
import { BuzzerStateButton } from "./BuzzerStateButton";
import { LiveTrackingStateButton } from "./LiveTrackingStateButton";
import {
  IBulkResponse,
  ITrackableObjectResponse,
} from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  trackableObjectData: ITrackableObjectResponse;
  bulkData: IBulkResponse;
  mutateBulkData: KeyedMutator<IBulkResponse>;
}

export const ManageTrackerSection: FC<IProps> = ({
  petId: _petId,
  trackableObjectData,
  bulkData,
  mutateBulkData,
}) => {
  if (!trackableObjectData || !bulkData) return null;

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
      </CardContent>
    </Card>
  );
};
