import { styled, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import {
  getBulkData,
  getDevicePosReport,
  getGeofences,
  getLeaderboard,
  getPetActivityBadges,
  getPetRecords,
  getTrackableObject,
  getTracker,
} from "@/lib/tractive/api";
import { useAuth } from "@/hooks/useAuth";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";
import { Loader } from "@/components/shared/Loader";
import { ManageTrackerSection } from "@/components/tractive/ManageTrackerSection";
import { formatErrorMessage, LeaderboardType } from "@/lib/tractive/api_utils";
import { PetLeaderboardSection } from "@/components/tractive/PetLeaderboardSection";
import { TrackYourPetSection } from "@/components/tractive/TrackYourPetSection";
import { PetRecordsSection } from "@/components/tractive/PetRecordsSection";
import { ActivityBadgesSection } from "@/components/tractive/ActivityBadgesSection";

const Root = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(2),
  margin: "auto",
  width: "fit-content",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const swrOptions = {
  revalidateOnFocus: false,
  refreshInterval: 1000 * 30, // 30 seconds
};

export default function PetPage() {
  const auth = useAuth();
  const router = useRouter();
  const { petId } = router.query as { petId: string };
  const [selectedLeaderboardType, setSelectedLeaderboardType] =
    useState<LeaderboardType>(LeaderboardType.LOCAL);

  const { data: trackableObjectData, error: trackableObjectError } = useSWR(
    {
      type: `trackable_objects-${petId}`,
      trackableObjectId: petId,
      authToken: auth.token,
    },
    petId ? getTrackableObject : null,
    swrOptions,
  );

  const { data: petRecordsData } = useSWR(
    {
      type: `pet_records-${petId}`,
      petId,
      authToken: auth.token,
    },
    petId ? getPetRecords : null,
    swrOptions,
  );

  const trackerId = trackableObjectData?.device_id;

  const { data: trackerData, error: trackerError } = useSWR(
    {
      type: `tracker-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getTracker : null,
    swrOptions,
  );

  const { data: activityBadgesData } = useSWR(
    {
      type: `activity_badges-${petId}`,
      petId,
      authToken: auth.token,
    },
    getPetActivityBadges,
    swrOptions,
  );

  const activityBadges = useMemo(
    () =>
      activityBadgesData?.map(({ _id }) => ({
        id: _id,
        type: "activity_badge",
      })),
    [activityBadgesData],
  );

  const { data: geofencesData } = useSWR(
    {
      type: `geofence-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getGeofences : null,
    swrOptions,
  );

  const geofences = useMemo(
    () =>
      geofencesData?.map(({ _id }) => ({
        id: _id,
        type: "geofence",
      })),
    [geofencesData],
  );

  const {
    data: bulkData,
    error: bulkError,
    mutate: mutateBulkData,
  } = useSWR(
    {
      type: `bulk_data-${trackerId}`,
      wantedItems: [
        {
          id: `${trackerId}_live_tracking`,
          type: "tracker_command_state",
        },
        {
          id: `${trackerId}_led_control`,
          type: "tracker_command_state",
        },
        {
          id: `${trackerId}_buzzer_control`,
          type: "tracker_command_state",
        },
        ...(geofences ?? []),
        ...(activityBadges ?? []),
      ],
      authToken: auth.token,
    },
    trackerId ? getBulkData : null,
    swrOptions,
  );

  const { data: leaderbordData, error: leaderboardError } = useSWR(
    {
      type: `leaderboard-${petId}`,
      boardType: selectedLeaderboardType,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      petId,
      boardLimit: 50,
      petLimit: 2,
      authToken: auth.token,
    },
    petId ? getLeaderboard : null,
    swrOptions,
  );

  const { data: devicePosReportData } = useSWR(
    {
      type: `device_pos_report-${trackerId}`,
      trackerId,
      authToken: auth.token,
    },
    trackerId ? getDevicePosReport : null,
    swrOptions,
  );

  const isLoading =
    !trackableObjectData ||
    !trackerData ||
    !bulkData ||
    !geofencesData ||
    !devicePosReportData ||
    !petRecordsData;
  const isError =
    trackableObjectError || trackerError || bulkError || leaderboardError;

  useMutateDebugState("trackableObject", trackableObjectData);
  useMutateDebugState("petRecords", petRecordsData);
  useMutateDebugState("activityBadges", activityBadgesData);
  useMutateDebugState("tracker", trackerData);
  useMutateDebugState("bulk", bulkData);
  useMutateDebugState("leaderboard", leaderbordData);
  useMutateDebugState("devicePosReport", devicePosReportData);
  useMutateDebugState("geofences", geofencesData);

  if (isError) {
    return (
      <ContentLayout title="Pet" hideTitle>
        <Typography variant="h3" color="error" p={2}>
          {formatErrorMessage(isError)}
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
      <Root>
        <ManageTrackerSection
          trackableObjectData={trackableObjectData}
          trackerData={trackerData}
          bulkData={bulkData}
          mutateBulkData={mutateBulkData}
        />

        <TrackYourPetSection
          petId={petId}
          bulkData={bulkData}
          trackableObjectData={trackableObjectData}
          devicePosReportData={devicePosReportData}
        />

        <PetRecordsSection petRecordsData={petRecordsData} />

        <ActivityBadgesSection bulkData={bulkData} />

        <PetLeaderboardSection
          leaderboardData={leaderbordData}
          trackableObjectData={trackableObjectData}
          selectedLeaderboardType={selectedLeaderboardType}
          setSelectedLeaderboardType={setSelectedLeaderboardType}
        />
      </Root>
    </ContentLayout>
  );
}
