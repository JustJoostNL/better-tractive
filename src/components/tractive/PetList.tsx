import { FC } from "react";
import useSWR from "swr";
import { styled, Typography } from "@mui/material";
import { PetListCard } from "./PetListCard";
import { useAuth } from "@/hooks/useAuth";
import { getTrackableObjects } from "@/lib/tractive/api";

export const Root = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gridGap: theme.spacing(2),
  margin: theme.spacing(2),
}));

export const PetList: FC = () => {
  const auth = useAuth();

  const { data } = useSWR(
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

  if (data?.length === 0) {
    return (
      <Root>
        <Typography variant="h6" color="text.secondary">
          No pets found.
        </Typography>
      </Root>
    );
  }

  return (
    <Root>
      {data?.map((pet) => <PetListCard key={pet._id} petId={pet._id} />)}
    </Root>
  );
};
