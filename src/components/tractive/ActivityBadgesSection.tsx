import React, { FC, useMemo } from "react";
import { Card, CardHeader, CardContent, List } from "@mui/material";
import { ActivityBadgeItem } from "./ActivityBadgeItem";
import { IBulkResponse } from "@/lib/tractive/api_types";

interface IProps {
  bulkData: IBulkResponse;
}

export const ActivityBadgesSection: FC<IProps> = ({ bulkData }) => {
  const badges = useMemo(() => {
    const groupedBadges = bulkData
      .filter((item) => item._type === "activity_badge")
      .reduce(
        (acc, item) => {
          const { activity_badge_category_id } = item;
          if (!activity_badge_category_id) return acc;

          if (!acc[activity_badge_category_id]) {
            acc[activity_badge_category_id] = [];
          }
          acc[activity_badge_category_id].push(item);
          return acc;
        },
        {} as Record<string, IBulkResponse>,
      );

    const sortedBadges = Object.values(groupedBadges)
      .map((items) =>
        items.sort((a, b) => (a.sort_index ?? 0) - (b.sort_index ?? 0)),
      )
      .flat();

    return sortedBadges;
  }, [bulkData]);

  return (
    <Card>
      <CardHeader title="Activity Badges" subheader="Your pet's achievements" />

      <CardContent>
        <List
          sx={{
            height: 400,
            overflow: "scroll",
          }}
        >
          {badges.map((item) => (
            <ActivityBadgeItem key={item._id} bulkItem={item} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
