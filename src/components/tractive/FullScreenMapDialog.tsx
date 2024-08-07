import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";

interface IProps {
  petId: string;
  open: boolean;
  onClose: () => void;
}

export const FullScreenMapDialog: FC<IProps> = ({ petId, open, onClose }) => {
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
        <TractiveMap petId={petId} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
