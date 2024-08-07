import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { InfoRounded, OpenInNewRounded } from "@mui/icons-material";
import { FullScreenMapDialog } from "./FullScreenMapDialog";
import {
  IBulkResponse,
  IDevicePosReportResponse,
  ITrackableObjectResponse,
} from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  bulkData: IBulkResponse;
  trackableObjectData: ITrackableObjectResponse;
  devicePosReportData: IDevicePosReportResponse;
}

export const TrackYourPetSection: FC<IProps> = ({
  petId,
  bulkData,
  trackableObjectData,
  devicePosReportData,
}) => {
  const [isFullScreenMapDialogOpen, setIsFullScreenMapDialogOpen] =
    useState(false);

  const TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  const geofences = useMemo(
    () => bulkData.filter((item) => item._type === "geofence"),
    [bulkData],
  );

  return (
    <Card>
      <FullScreenMapDialog
        petId={petId}
        geofences={geofences}
        open={isFullScreenMapDialogOpen}
        onClose={() => setIsFullScreenMapDialogOpen(false)}
      />
      <CardHeader
        title="Track your pet"
        subheader={
          <Stack direction="row" spacing={1} alignItems="center" mt={-1}>
            <Typography variant="body1" color="text.secondary">
              See where your pet is right now
            </Typography>

            <IconButton>
              <Tooltip
                arrow
                placement="right"
                title={`Last updated at ${new Date(
                  devicePosReportData.time_rcvd * 1000,
                ).toLocaleString()}`}
              >
                <InfoRounded color="primary" />
              </Tooltip>
            </IconButton>
          </Stack>
        }
      />

      <CardContent
        sx={{
          width: "100%",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TractiveMap
          geofences={geofences}
          trackableObjectData={trackableObjectData}
          devicePosReportData={devicePosReportData}
        />

        <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
          <Button
            startIcon={<OpenInNewRounded />}
            variant="outlined"
            onClick={() => setIsFullScreenMapDialogOpen(true)}
          >
            Full screen map
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
