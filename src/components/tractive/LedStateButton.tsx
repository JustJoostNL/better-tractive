import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { KeyedMutator } from "swr";
import { FlashlightOffRounded, FlashlightOnRounded } from "@mui/icons-material";
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

export const LedStateButton: FC<IProps> = ({
  trackerId,
  bulkData,
  mutateBulkData,
}) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const ledState = useMemo(
    () => bulkData?.find((item) => item._id.includes("led_control"))?.active,
    [bulkData],
  );

  const pendingState = useMemo(
    () => bulkData?.find((item) => item._id.includes("led_control"))?.pending,
    [bulkData],
  );

  useEffect(() => {
    setLoading(!!pendingState);
  }, [pendingState]);

  const checkForExpectedLedState = useCallback(async () => {
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
    if (typeof trackerId !== "string" || typeof ledState === "undefined") {
      return;
    }

    setLoading(true);

    const response = await mutateTrackerState({
      trackerId,
      commandId: TrackerCommand.LedControl,
      command: ledState ? "off" : "on",
      authToken: auth.token,
    });

    setLoading(!!response.pending);
    await checkForExpectedLedState();
  }, [auth.token, checkForExpectedLedState, ledState, trackerId]);

  if (typeof trackerId !== "string" || typeof ledState === "undefined") {
    return null;
  }

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={handleClick}
      startIcon={ledState ? <FlashlightOffRounded /> : <FlashlightOnRounded />}
    >
      {ledState ? "Turn Off LED" : "Turn On LED"}
    </LoadingButton>
  );
};
