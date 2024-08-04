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
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { BatteryFullRounded } from "@mui/icons-material";
import { Label, LabelColor } from "../shared/Label";
import {
  getDeviceHardwareReport,
  getTrackableObject,
  getTracker,
} from "@/lib/tractive/api";
import { useDebug } from "@/hooks/useDebug";
import { useAuth } from "@/hooks/useAuth";
import { mediaResourcePath } from "@/lib/tractive/api_paths";

interface IProps {
  petId: string;
}

export const PetListCard: FC<IProps> = ({ petId }) => {
  const auth = useAuth();
  const debug = useDebug();

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

  const { data: hwReportData } = useSWR(
    {
      type: `hwreport-${trackableObjectData?.device_id}`,
      trackerId: trackableObjectData?.device_id,
      authToken: auth.token,
    },
    getDeviceHardwareReport,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  if (!trackableObjectData || !trackerData) return null;

  return (
    <Box>
      <Card>
        <CardActionArea
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
                "https://graph.tractive.com" +
                mediaResourcePath(
                  trackableObjectData?.details.profile_picture_id,
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
                <BatteryFullRounded
                  sx={{ transform: "rotate(90deg)", mr: 1 }}
                />
                {hwReportData?.battery_level}%
              </Label>
            </Stack>

            <Label>{trackableObjectData?.details.pet_type}</Label>
          </CardContent>
        </CardActionArea>
      </Card>

      {debug && <JSONTree data={trackableObjectData} />}
    </Box>
  );
};
