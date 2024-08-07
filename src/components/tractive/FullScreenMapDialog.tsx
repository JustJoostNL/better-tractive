import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";
import { BulkItem } from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  geofences: BulkItem[];
  open: boolean;
  onClose: () => void;
}

export const FullScreenMapDialog: FC<IProps> = ({
  petId,
  geofences,
  open,
  onClose,
}) => {
  const TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{ width: "100%", height: "100%", zIndex: 10000 }}
    >
      <DialogContent>
        <TractiveMap petId={petId} geofences={geofences} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
