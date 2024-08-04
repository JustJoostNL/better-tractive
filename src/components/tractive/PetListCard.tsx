import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { JSONTree } from "react-json-tree";
import useSWR from "swr";
import { getTrackableObject } from "@/lib/tractive/api";
import { useDebug } from "@/hooks/useDebug";
import { useAuth } from "@/hooks/useAuth";
import { mediaResourcePath } from "@/lib/tractive/api_paths";

interface IProps {
  petId: string;
}

export const PetListCard: FC<IProps> = ({ petId }) => {
  const auth = useAuth();
  const debug = useDebug();

  const { data } = useSWR(
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

  if (!data) return null;

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
                mediaResourcePath(data?.details.profile_picture_id, {
                  width: 400,
                  height: 225,
                })
              }
            />
          </Box>

          <CardContent>
            <Typography variant="h5" component="div">
              {data?.details.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {debug && <JSONTree data={data} />}
    </Box>
  );
};
