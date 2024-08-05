import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { KeyedMutator } from "swr";
import { MusicNoteRounded, MusicOffRounded } from "@mui/icons-material";
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

export const BuzzerStateButton: FC<IProps> = ({
  trackerId,
  bulkData,
  mutateBulkData,
}) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const buzzerState = useMemo(
    () => bulkData?.find((item) => item._id.includes("buzzer_control"))?.active,
    [bulkData],
  );

  const pendingState = useMemo(
    () =>
      bulkData?.find((item) => item._id.includes("buzzer_control"))?.pending,
    [bulkData],
  );

  useEffect(() => {
    setLoading(!!pendingState);
  }, [pendingState]);

  const checkForExpectedBuzzerState = useCallback(async () => {
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
    if (typeof trackerId !== "string" || typeof buzzerState === "undefined") {
      return;
    }

    setLoading(true);

    const response = await mutateTrackerState({
      trackerId,
      commandId: TrackerCommand.BuzzerControl,
      command: buzzerState ? "off" : "on",
      authToken: auth.token,
    });

    setLoading(!!response.pending);
    await checkForExpectedBuzzerState();
  }, [auth.token, checkForExpectedBuzzerState, buzzerState, trackerId]);

  if (typeof trackerId !== "string" || typeof buzzerState === "undefined") {
    return null;
  }

  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={handleClick}
      startIcon={buzzerState ? <MusicOffRounded /> : <MusicNoteRounded />}
    >
      {buzzerState ? "Turn Off Buzzer" : "Turn On Buzzer"}
    </LoadingButton>
  );
};
