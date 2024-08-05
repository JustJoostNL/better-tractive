import { Card, CardContent, CardHeader, List } from "@mui/material";
import { FC } from "react";
import { PetLeaderboardItem } from "./PetLeaderboardItem";
import { ILeaderboardResponse } from "@/lib/tractive/api_types";

interface IProps {
  leaderboardData: ILeaderboardResponse;
}

export const PetLeaderboardSection: FC<IProps> = ({ leaderboardData }) => {
  if (!leaderboardData) return null;

  return (
    <Card
      sx={{
        width: "fit-content",
        marginBottom: 2,
      }}
    >
      <CardHeader
        title="Leaderboard"
        subheader="See how your pet is doing compared to others"
      />

      <CardContent>
        <List>
          {leaderboardData.board.map((item) => (
            <PetLeaderboardItem key={item.friendship_code} item={item} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
