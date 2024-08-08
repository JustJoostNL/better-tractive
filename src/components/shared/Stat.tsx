import { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface IProps {
  title: string;
  value: ReactNode | undefined;
}

export const Stat: FC<IProps> = ({ title, value }) => {
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
