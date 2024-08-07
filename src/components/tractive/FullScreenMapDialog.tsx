import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import dynamic from "next/dynamic";
import React, { FC, useMemo } from "react";
import {
  BulkItem,
  IDevicePosReportResponse,
  ITrackableObjectResponse,
} from "@/lib/tractive/api_types";

interface IProps {
  petId: string;
  geofences: BulkItem[];
  trackableObjectData: ITrackableObjectResponse;
  devicePosReportData: IDevicePosReportResponse;
  open: boolean;
  onClose: () => void;
}

export const FullScreenMapDialog: FC<IProps> = ({
  geofences,
  trackableObjectData,
  devicePosReportData,
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
        <TractiveMap
          geofences={geofences}
          trackableObjectData={trackableObjectData}
          devicePosReportData={devicePosReportData}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
