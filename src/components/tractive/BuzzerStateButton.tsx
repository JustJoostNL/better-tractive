import { FC, useCallback, useMemo, useState } from "react";
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

const MAX_TIMEOUT = 15;

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

  const checkForExpectedBuzzerState = useCallback(
    async (expectedState: boolean) => {
      let timeoutCounter = 0;

      const interval = setInterval(async () => {
        const newBuzzerState = (await mutateBulkData())?.find((item) =>
          item._id.includes("buzzer_control"),
        )?.active;

        if (newBuzzerState === expectedState) {
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
    if (response.pending) await checkForExpectedBuzzerState(!buzzerState);
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
