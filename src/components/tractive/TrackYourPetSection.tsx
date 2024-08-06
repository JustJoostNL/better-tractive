import { Card, CardHeader, CardContent, Button, Stack } from "@mui/material";
import { FC, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { OpenInNewRounded } from "@mui/icons-material";
import { FullScreenMapDialog } from "./FullScreenMapDialog";

interface IProps {
  petId: string;
}

export const TrackYourPetSection: FC<IProps> = ({ petId }) => {
  const [isFullScreenMapDialogOpen, setIsFullScreenMapDialogOpen] =
    useState(false);

  const TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  return (
    <Card>
      <FullScreenMapDialog
        petId={petId}
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
        <TractiveMap petId={petId} />

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
