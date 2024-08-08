import React, { FC, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Stat } from "../shared/Stat";
import { IPetRecordsResponse } from "@/lib/tractive/api_types";

interface IProps {
  petRecordsData: IPetRecordsResponse;
}

export const PetRecordsSection: FC<IProps> = ({ petRecordsData }) => {
  const minutesToHM = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }, []);

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader title="Records" subheader="View your pet's records" />

      <CardContent>
        <Stack spacing={2} direction="row">
          <Box>
            <Typography variant="h5" mb={1}>
              Averages
            </Typography>

            <Stack spacing={2}>
              <Stat
                title="Calories"
                value={petRecordsData.averages.calories + " kcal"}
              />
              <Stat
                title="Active time"
                value={minutesToHM(petRecordsData.averages.active)}
              />
              <Stat
                title="Resting time"
                value={minutesToHM(petRecordsData.averages.resting)}
              />
              <Stat
                title="Sleeping time"
                value={minutesToHM(petRecordsData.averages.sleeping)}
              />
            </Stack>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box>
            <Typography variant="h5" mb={1}>
              Records
            </Typography>

            <Stack spacing={2}>
              <Stat
                title="Best day"
                value={minutesToHM(
                  petRecordsData.records.best_day.minutes ?? 0,
                )}
              />
              <Stat
                title="Longest streak"
                value={petRecordsData.records.longest_streak.days + " days"}
              />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
