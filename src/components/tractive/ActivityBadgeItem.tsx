import { FC } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";
import { BulkItem } from "@/lib/tractive/api_types";

interface IProps {
  bulkItem: BulkItem;
}

export const ActivityBadgeItem: FC<IProps> = ({ bulkItem }) => {
  return (
    <ListItem
      disabled={!bulkItem.achieved_at}
      sx={{
        alignItems: "flex-start",
        "&:nth-of-type(odd)": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {bulkItem.icon_url && (
        <ListItemIcon sx={{ mr: 1 }}>
          <Image src={bulkItem.icon_url} alt="" width={50} height={50} />
        </ListItemIcon>
      )}

      <ListItemText
        primary={bulkItem.name_localizations?.en}
        secondary={bulkItem.description_localizations?.en}
      />
    </ListItem>
  );
};
