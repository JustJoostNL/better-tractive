import { FC, useCallback, useMemo } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { PetsRounded } from "@mui/icons-material";
import { LeaderboardItem } from "@/lib/tractive/api_types";
import { mediaResourcePath } from "@/lib/tractive/api_paths";
import { tractiveBaseUrl } from "@/lib/tractive/api_utils";

interface IProps {
  item: LeaderboardItem;
}

const descriptions = [
  "Wow, that's amazing!",
  "Great job!",
  "Keep it up!",
  "You're doing awesome!",
  "You're a superstar!",
  "That's impressive!",
  "You're a rockstar!",
  "You're a legend!",
  "You're a champion!",
  "You're a hero!",
  "You're a winner!",
  "You're a top performer!",
  "You're a top achiever!",
  "You're a top player!",
  "You're a top scorer!",
  "You're a top pet!",
];

export const PetLeaderboardItem: FC<IProps> = ({ item }) => {
  const imageId = useMemo(() => {
    if (!item.image_url) return null;

    const url = new URL(item.image_url);
    const path = url.pathname.split("/").pop();
    const id = path?.split(".").shift();
    if (!id) return null;

    return tractiveBaseUrl + mediaResourcePath(id, { width: 400, height: 225 });
  }, [item.image_url]);

  const capitalizePetName = useCallback((name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          mr: 2,
          width: "3rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">#{item.rank}</Typography>
      </Box>

      <ListItemAvatar
        sx={{
          width: 50,
          height: 50,
          mr: 1,
        }}
      >
        {imageId ? (
          <Image
            src={imageId}
            alt={`Avatar of ${item.name}`}
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <PetsRounded
            fontSize="large"
            color="primary"
            style={{ fontSize: 50 }}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={capitalizePetName(item.name)}
        secondary={
          <Tooltip
            title={
              descriptions[Math.floor(Math.random() * descriptions.length)]
            }
            arrow
            placement="bottom"
          >
            <Typography variant="body2" component="span">
              {item.score} minutes
            </Typography>
          </Tooltip>
        }
        sx={{ ml: 1 }}
      />
    </ListItem>
  );
};
