import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { KeyedMutator } from "swr";
import { GpsFixedRounded, GpsOffRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IBulkResponse } from "@/lib/tractive/api_types";
import { mutateTrackerState } from "@/lib/tractive/api";
import { TrackerCommand } from "@/lib/tractive/api_utils";
import { useAuth } from "@/hooks/useAuth";

interface IProps {
  trackerId: string;
  bulkData: IBulkResponse;
  mutateBulkData: KeyedMutator<IBulkResponse>;
}

const MAX_CHECKS = 10;

export const LiveTrackingStateButton: FC<IProps> = ({
  trackerId,
  bulkData,
  mutateBulkData,
}) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const liveTrackingState = useMemo(
    () => bulkData?.find((item) => item._id.includes("live_tracking"))?.active,
    [bulkData],
  );

  const pendingState = useMemo(
    () => bulkData?.find((item) => item._id.includes("live_tracking"))?.pending,
    [bulkData],
  );

  useEffect(() => {
    setLoading(!!pendingState);
  }, [pendingState]);

  const checkForExpectedLiveTrackingState = useCallback(async () => {
    let checkCounter = 0;

    const interval = setInterval(async () => {
      await mutateBulkData();

      if (checkCounter > MAX_CHECKS) {
        clearInterval(interval);
      }

      checkCounter++;
    }, 1000);
  }, [mutateBulkData]);

  const handleClick = useCallback(async () => {
    if (
      typeof trackerId !== "string" ||
      typeof liveTrackingState === "undefined"
    ) {
      return;
    }

    setLoading(true);

    const response = await mutateTrackerState({
      trackerId,
      commandId: TrackerCommand.LiveTracking,
      command: liveTrackingState ? "off" : "on",
      authToken: auth.token,
    });

    setLoading(!!response.pending);
    await checkForExpectedLiveTrackingState();
  }, [
    auth.token,
    checkForExpectedLiveTrackingState,
    liveTrackingState,
    trackerId,
  ]);

  if (
    typeof trackerId !== "string" ||
    typeof liveTrackingState === "undefined"
  ) {
    return null;
  }

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={handleClick}
      startIcon={liveTrackingState ? <GpsOffRounded /> : <GpsFixedRounded />}
    >
      {liveTrackingState ? "Turn Off Live Tracking" : "Turn On Live Tracking"}
    </LoadingButton>
  );
};
