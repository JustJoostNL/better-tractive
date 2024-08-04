import React from "react";
import useSWR from "swr";
import { Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/lib/tractive/api";
import { Loader } from "@/components/shared/Loader";
import { PetList } from "@/components/tractive/PetList";
import { useSetDebugData } from "@/hooks/useDebug";

export default function Index() {
  const auth = useAuth();

  const { data, isLoading } = useSWR(
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

  useSetDebugData({ key: "userData", value: data, condition: !!data });

  if (isLoading) {
    return (
      <ContentLayout title="Home">
        <Loader />
      </ContentLayout>
    );
  }

  const name =
    (data?.details.first_name && data?.details.last_name) !== undefined
      ? `${data?.details.first_name} ${data?.details.last_name}`
      : data?.details.first_name
        ? data?.details.first_name
        : "User";

  return (
    <ContentLayout title="Home">
      <Typography variant="h3" px={2}>
        Welcome back to Better Tractive, {name}!
      </Typography>

      <Typography px={2} color="text.secondary">
        Please select a pet you would like to view.
      </Typography>

      <PetList />
    </ContentLayout>
  );
}
