import React from "react";
import { Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const auth = useAuth();

  if (!auth.isAuthenticated) return null;

  return (
    <ContentLayout title="Home">
      <Typography variant="h3" px={2}>
        Welcome to Better Tractive
      </Typography>
    </ContentLayout>
  );
}
