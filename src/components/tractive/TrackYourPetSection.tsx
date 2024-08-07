import { Card, CardHeader, CardContent, Button, Stack } from "@mui/material";
import { FC, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { OpenInNewRounded } from "@mui/icons-material";
import { FullScreenMapDialog } from "./FullScreenMapDialog";
import { IBulkResponse } from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  bulkData: IBulkResponse;
}

export const TrackYourPetSection: FC<IProps> = ({ petId, bulkData }) => {
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
        subheader="See where your pet is right now"
      />

      <CardContent
        sx={{
          width: "100%",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TractiveMap petId={petId} geofences={geofences} />

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
