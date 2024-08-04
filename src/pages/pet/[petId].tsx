import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function PetPage() {
  const router = useRouter();
  const { petId } = router.query as { petId: string };

  const TractiveMap = useMemo(
    () =>
      dynamic(() => import("@/components/tractive/TractiveMap"), {
        ssr: false,
      }),
    [],
  );

  if (!petId) return <Typography>Missing petId</Typography>;

  return (
    <ContentLayout title="Your pet">
      <Typography variant="h3" px={2}>
        {petId}
      </Typography>

      <TractiveMap petId={petId} />
    </ContentLayout>
  );
}
