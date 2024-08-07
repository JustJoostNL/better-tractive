import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Label, LabelColor } from "../shared/Label";
import { BatteryIcon } from "./BatteryIcon";
import {
  getDeviceHardwareReport,
  getTrackableObject,
  getTracker,
} from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { mediaResourcePath } from "@/lib/tractive/api_paths";
import { tractiveBaseUrl } from "@/lib/tractive/api_utils";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";

interface IProps {
  petId: string;
}

export const PetListCard: FC<IProps> = ({ petId }) => {
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

  const { data: trackerData } = useSWR(
    {
      type: `tracker-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getTracker : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: hwReportData } = useSWR(
    {
      type: `hwreport-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getDeviceHardwareReport : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  useMutateDebugState("trackableObject", trackableObjectData);
  useMutateDebugState("tracker", trackerData);
  useMutateDebugState("hardwareReport", hwReportData);

  if (!trackableObjectData || !trackerData || !hwReportData) return null;

  return (
    <Box>
      <Card>
        <CardActionArea
          LinkComponent={Link}
          href={`/pet/${petId}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Box
            position="relative"
            sx={{ aspectRatio: "16/9", width: "100%", height: "auto" }}
          >
            <CardMedia
              component="img"
              image={
                tractiveBaseUrl +
                mediaResourcePath(
                  trackableObjectData?.details.cover_picture_id,
                  {
                    width: 400,
                    height: 225,
                  },
                )
              }
            />
          </Box>

          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5" component="div">
                {trackableObjectData?.details.name}
              </Typography>
              <Label>{trackableObjectData?.details.pet_type}</Label>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <Label
                color={
                  trackerData?.state === "OPERATIONAL"
                    ? LabelColor.SUCCESS
                    : LabelColor.ERROR
                }
              >
                {trackerData?.state}
              </Label>

              <Label>
                <BatteryIcon
                  level={hwReportData.battery_level}
                  charging={trackerData.charging_state === "CHARGING"}
                />
                {hwReportData.battery_level}%
              </Label>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
