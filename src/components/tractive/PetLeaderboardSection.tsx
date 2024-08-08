import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  List,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { PetLeaderboardItem } from "./PetLeaderboardItem";
import {
  ILeaderboardResponse,
  ITrackableObjectResponse,
} from "@/lib/tractive/api_types";
import { LeaderboardType } from "@/lib/tractive/api_utils";

interface IProps {
  leaderboardData: ILeaderboardResponse | undefined;
  trackableObjectData: ITrackableObjectResponse;
  selectedLeaderboardType: LeaderboardType;
  setSelectedLeaderboardType: Dispatch<SetStateAction<LeaderboardType>>;
}

const tabToTooltipText: Record<LeaderboardType, string> = {
  [LeaderboardType.WORLDWIDE]:
    "Pets with the most active minutes this month worldwide",
  [LeaderboardType.BREED]:
    "See how active your pet is compared to dogs or cats of the same breed. Have a mixed breed? You'll see the one entered first in your pet's profile.",
  [LeaderboardType.LOCAL]:
    "See the 50 most active Tractive pets closest to PET_NAME.",
  [LeaderboardType.FRIENDS]:
    "Pets with most active minutes among your friends.",
};

export const PetLeaderboardSection: FC<IProps> = ({
  leaderboardData,
  trackableObjectData,
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
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {Object.values(LeaderboardType).map((type) => (
          <Tab
            key={type}
            value={type}
            label={
              <Tooltip
                title={tabToTooltipText[type].replace(
                  "PET_NAME",
                  trackableObjectData.details.name,
                )}
                placement="top"
                arrow
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", fontSize: 14 }}
                >
                  {type}
                </Typography>
              </Tooltip>
            }
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
