import { Card, CardContent, CardHeader, List, Tab, Tabs } from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { PetLeaderboardItem } from "./PetLeaderboardItem";
import { ILeaderboardResponse } from "@/lib/tractive/api_types";
import { LeaderboardType } from "@/lib/tractive/api_utils";

interface IProps {
  leaderboardData: ILeaderboardResponse;
  selectedLeaderboardType: LeaderboardType;
  setSelectedLeaderboardType: Dispatch<SetStateAction<LeaderboardType>>;
}

export const PetLeaderboardSection: FC<IProps> = ({
  leaderboardData,
  selectedLeaderboardType,
  setSelectedLeaderboardType,
}) => {
  const handleTabChange = useCallback(
    (value: LeaderboardType) => {
      setSelectedLeaderboardType(value);
    },
    [setSelectedLeaderboardType],
  );

  if (!leaderboardData) return null;

  return (
    <Card
      sx={{
        marginBottom: 2,
        width: "auto",
        height: 500,
        overflow: "scroll",
      }}
    >
      <CardHeader
        title="Leaderboard"
        subheader="See how your pet is doing compared to others"
      />

      <Tabs
        value={selectedLeaderboardType}
        onChange={(_ev, value) => handleTabChange(value)}
      >
        {Object.values(LeaderboardType).map((type) => (
          <Tab
            key={type}
            value={type}
            label={type}
            style={{ fontWeight: "bold" }}
          />
        ))}
      </Tabs>

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
