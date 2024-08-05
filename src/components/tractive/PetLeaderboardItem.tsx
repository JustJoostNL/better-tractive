import { FC } from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LeaderboardItem } from "@/lib/tractive/api_types";
import { proxyUrl } from "@/lib/tractive/api_utils";

interface IProps {
  item: LeaderboardItem;
}

export const PetLeaderboardItem: FC<IProps> = ({ item }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <img
          src={proxyUrl(item.image_url)}
          alt={`Avatar of ${item.name}`}
          width={40}
          height={40}
        />
      </ListItemAvatar>
      <ListItemText primary={item.name} secondary={item.score} />
    </ListItem>
  );
};
