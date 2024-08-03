import React from "react";
import { Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function Index() {
  return (
    <ContentLayout title="Home">
      <Typography variant="h3" px={2}>
        Welcome to Better Tractive
      </Typography>
    </ContentLayout>
  );
}
