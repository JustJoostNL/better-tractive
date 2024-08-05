import { FC, useCallback, useMemo } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { PetsRounded } from "@mui/icons-material";
import { LeaderboardItem } from "@/lib/tractive/api_types";
import { mediaResourcePath } from "@/lib/tractive/api_paths";
import { tractiveBaseUrl } from "@/lib/tractive/api_utils";

interface IProps {
  item: LeaderboardItem;
}

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
    <ListItem>
      <Typography variant="h3" sx={{ mr: 2 }}>
        #{item.rank}
      </Typography>

      <ListItemAvatar sx={{ width: 50, height: 50, mr: 1 }}>
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
        secondary={item.score}
      />
    </ListItem>
  );
};
