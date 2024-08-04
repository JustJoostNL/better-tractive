import { FC, useCallback, useMemo, useState } from "react";
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

const MAX_TIMEOUT = 15;

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

  const checkForExpectedLedState = useCallback(
    async (expectedState: boolean) => {
      let timeoutCounter = 0;

      const interval = setInterval(async () => {
        const newLedState = (await mutateBulkData())?.find((item) =>
          item._id.includes("led_control"),
        )?.active;

        if (newLedState === expectedState) {
          setLoading(false);
          clearInterval(interval);
        }

        if (timeoutCounter > MAX_TIMEOUT) {
          setLoading(false);
          clearInterval(interval);
        }

        timeoutCounter++;
      }, 1000);
    },
    [mutateBulkData],
  );

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
    if (response.pending) await checkForExpectedLedState(!ledState);
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
