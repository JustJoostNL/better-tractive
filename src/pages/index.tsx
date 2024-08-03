import React from "react";
import useSWR from "swr";
import { Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/lib/tractive/api";

export default function Index() {
  const auth = useAuth();

  const { data } = useSWR(
    {
      userId: auth.userId,
      authToken: auth.token,
    },
    getUser,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 1, // 1 minute
    },
  );

  return (
    <ContentLayout title="Home">
      <Typography variant="h3" px={2}>
        Welcome back to Better Tractive, {data?.details.first_name}!
      </Typography>
    </ContentLayout>
  );
}
