import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import {
  getBulkData,
  getTrackableObject,
  getTracker,
} from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";
import { Loader } from "@/components/shared/Loader";
import { ManageTrackerSection } from "@/components/tractive/ManageTrackerSection";

export default function PetPage() {
  const router = useRouter();
  const { petId } = router.query as { petId: string };
  const auth = useAuth();

  const _TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  const { data: trackableObjectData } = useSWR(
    {
      type: `trackable_objects-${petId}`,
      trackableObjectId: petId,
      authToken: auth.token,
    },
    getTrackableObject,
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

  useMutateDebugState("trackableObject", trackableObjectData);
  useMutateDebugState("tracker", trackerData);
  useMutateDebugState("bulk", bulkData);

  if (!trackableObjectData || !trackerData || !bulkData) {
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
      </Stack>
    </ContentLayout>
  );
}
