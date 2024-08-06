import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { PetListCard } from "./PetListCard";
import { IObjectListResponse } from "@/lib/tractive/api_types";

export const Root = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gridGap: theme.spacing(2),
  margin: theme.spacing(2),
}));

interface IProps {
  trackableObjectsData: IObjectListResponse | undefined;
}

export const PetList: FC<IProps> = ({ trackableObjectsData }) => {
  if (trackableObjectsData?.length === 0) {
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
      {trackableObjectsData?.map((pet) => (
        <PetListCard key={pet._id} petId={pet._id} />
      ))}
    </Root>
  );
};
