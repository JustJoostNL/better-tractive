import React, { FC, ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { IPetRecordsResponse } from "@/lib/tractive/api_types";

interface IProps {
  petRecordsData: IPetRecordsResponse;
}

const Stat: FC<{ title: string; value: ReactNode | undefined }> = ({
  title,
  value,
}) => {
  if (value === undefined) return null;

  return (
    <Stack>
      <Typography component="div" variant="body1" color="text.secondary">
        {title}
      </Typography>

      <Typography
        component="div"
        variant="body1"
        color="text.primary"
        fontWeight={600}
        sx={{
          fontFeatureSettings: "'tnum' on, 'lnum' on",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export const PetRecordsSection: FC<IProps> = ({ petRecordsData }) => {
  return (
    <Card
      sx={{
        width: "fit-content",
        height: "fit-content",
        marginBottom: 2,
      }}
    >
      <CardHeader title="Records" subheader="View your pet's records" />

      <CardContent>
        <Stack spacing={2} direction="row">
          <Box>
            <Typography variant="h5" mb={1}>
              Averages
            </Typography>

            <Stack spacing={2}>
              <Stat
                title="Average calories"
                value={petRecordsData.averages.calories}
              />
              <Stat
                title="Average active minutes"
                value={petRecordsData.averages.active}
              />
              <Stat
                title="Resting minutes"
                value={petRecordsData.averages.resting}
              />
              <Stat
                title="Sleeping minutes"
                value={petRecordsData.averages.sleeping}
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5" mb={1}>
              Records
            </Typography>

            <Stack spacing={2}>
              <Stat
                title="Best day"
                value={petRecordsData.records.best_day.minutes + " min"}
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
