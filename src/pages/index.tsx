import React from "react";
import useSWR from "swr";
import { Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useAuth } from "@/hooks/useAuth";
import { getTrackableObjects, getUser } from "@/lib/tractive/api";
import { Loader } from "@/components/shared/Loader";
import { PetList } from "@/components/tractive/PetList";
import { useMutateDebugState } from "@/hooks/useMutateDebugState";

export default function Index() {
  const auth = useAuth();

  const { data: userData, isLoading: isUserDataLoading } = useSWR(
    {
      type: "user",
      userId: auth.userId,
      authToken: auth.token,
    },
    getUser,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 1, // 1 minute
    },
  );

  const {
    data: trackableObjectsData,
    isLoading: isTrackableObjectDataLoading,
  } = useSWR(
    {
      type: "trackable_objects",
      userId: auth.userId,
      authToken: auth.token,
    },
    getTrackableObjects,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 1, // 1 minute
    },
  );

  useMutateDebugState("user", userData);

  const isLoading = isUserDataLoading || isTrackableObjectDataLoading;

  if (isLoading) {
    return (
      <ContentLayout title="Home">
        <Loader />
      </ContentLayout>
    );
  }

  const name =
    (userData?.details.first_name && userData?.details.last_name) !== undefined
      ? `${userData?.details.first_name} ${userData?.details.last_name}`
      : userData?.details.first_name
        ? userData?.details.first_name
        : "User";

  return (
    <ContentLayout title="Home">
      <Typography variant="h3" px={2}>
        Welcome back to Better Tractive, {name}!
      </Typography>

      <Typography px={2} color="text.secondary">
        Please select a pet you would like to view.
      </Typography>

      <PetList trackableObjectsData={trackableObjectsData} />
    </ContentLayout>
  );
}
