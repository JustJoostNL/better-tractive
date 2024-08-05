import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import {
  getBulkData,
  getLeaderboard,
  getTrackableObject,
  getTracker,
} from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";
import { Loader } from "@/components/shared/Loader";
import { ManageTrackerSection } from "@/components/tractive/ManageTrackerSection";
import { LeaderboardType } from "@/lib/tractive/api_utils";
import { PetLeaderboardSection } from "@/components/tractive/PetLeaderboardSection";

export default function PetPage() {
  const auth = useAuth();
  const router = useRouter();
  const { petId } = router.query as { petId: string };

  const _TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  const { data: trackableObjectData, error: trackableObjectError } = useSWR(
    {
      type: `trackable_objects-${petId}`,
      trackableObjectId: petId,
      authToken: auth.token,
    },
    petId ? getTrackableObject : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: trackerData } = useSWR(
    {
      type: `tracker-${trackableObjectData?.device_id}`,
      trackerId: trackableObjectData?.device_id,
      authToken: auth.token,
    },
    trackableObjectData?.device_id ? getTracker : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: bulkData, mutate: mutateBulkData } = useSWR(
    {
      type: `bulk_data-${trackableObjectData?.device_id}`,
      wantedItems: [
        {
          id: `${trackableObjectData?.device_id}_live_tracking`,
          type: "tracker_command_state",
        },
        {
          id: `${trackableObjectData?.device_id}_led_control`,
          type: "tracker_command_state",
        },
        {
          id: `${trackableObjectData?.device_id}_buzzer_control`,
          type: "tracker_command_state",
        },
      ],
      authToken: auth.token,
    },
    trackableObjectData?.device_id ? getBulkData : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: leaderbordData } = useSWR(
    {
      type: `leaderboard-${petId}`,
      boardType: LeaderboardType.LOCAL,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      petId,
      boardLimit: 50,
      petLimit: 0,
      authToken: auth.token,
    },
    petId ? getLeaderboard : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 30, // 30 seconds
    },
  );

  const isLoading =
    !trackableObjectData || !trackerData || !bulkData || !leaderbordData;

  useMutateDebugState("trackableObject", trackableObjectData);
  useMutateDebugState("tracker", trackerData);
  useMutateDebugState("bulk", bulkData);

  if (trackableObjectError) {
    return (
      <ContentLayout title="Pet" hideTitle>
        <Typography variant="h3" color="error" p={2}>
          {trackableObjectError.message}:{" "}
          {trackableObjectError.response?.status} (
          {trackableObjectError.response?.statusText})
        </Typography>
      </ContentLayout>
    );
  }

  if (isLoading) {
    return (
      <ContentLayout title="Pet" hideTitle>
        <Loader />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title={`Dashboard for ${trackableObjectData?.details.name}`}>
      <Stack p={2} direction="row" spacing={2}>
        <ManageTrackerSection
          petId={petId}
          trackableObjectData={trackableObjectData}
          bulkData={bulkData}
          mutateBulkData={mutateBulkData}
        />

        <PetLeaderboardSection leaderboardData={leaderbordData} />
      </Stack>
    </ContentLayout>
  );
}
