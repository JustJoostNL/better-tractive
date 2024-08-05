import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  List,
  Tab,
  Tabs,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { PetLeaderboardItem } from "./PetLeaderboardItem";
import { ILeaderboardResponse } from "@/lib/tractive/api_types";
import { LeaderboardType } from "@/lib/tractive/api_utils";

interface IProps {
  leaderboardData: ILeaderboardResponse | undefined;
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

  return (
    <Card
      sx={{
        marginBottom: 2,
        width: "auto",
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
        <List
          sx={{
            height: 400,
            overflow: "scroll",
          }}
        >
          {!leaderboardData ? (
            <Container sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Container>
          ) : (
            leaderboardData.board.map((item) => (
              <PetLeaderboardItem key={item.rank} item={item} />
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};
