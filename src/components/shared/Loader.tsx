import React, { FC } from "react";
import { CircularProgress, CircularProgressProps, styled } from "@mui/material";

const Root = styled("div")(() => ({
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  height: "100vh",
}));

export const Loader: FC<CircularProgressProps> = (props) => {
  return (
    <Root>
      <CircularProgress size={50} {...props} />
    </Root>
  );
};
