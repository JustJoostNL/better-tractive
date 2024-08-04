import { Box, Theme, alpha, styled, useTheme } from "@mui/material";
import React from "react";

export enum LabelColor {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "inline" &&
    prop !== "color" &&
    prop !== "button" &&
    prop !== "flat",
})(
  ({
    theme,
    inline,
    color,
    button,
    flat,
  }: {
    theme: Theme;
    inline: boolean;
    color: LabelColor;
    button: boolean;
    flat: boolean;
  }) => ({
    fontFamily: theme.typography.fontFamily,
    alignItems: "center",
    borderRadius: 3,
    display: "inline-flex",
    flexGrow: 0,
    whiteSpace: "nowrap",
    cursor: "inherit",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: "center",
    letterSpacing: 0.5,
    lineHeight: 1,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: "uppercase",
    ...(inline && { display: "inline" }),
    ...(button && {
      transition: theme.transitions.create("opacity", { duration: 100 }),
      "&:hover": {
        filter: "brightness(85%)",
      },
    }),
    ...(color === LabelColor.DEFAULT && {
      color: theme.palette.text.secondary,
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.text.secondary, 0.4)}`,
      backgroundColor: alpha(
        theme.palette.text.secondary,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.PRIMARY && {
      color:
        theme.palette.primary[
          theme.palette.mode === "light" ? "dark" : "light"
        ],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.primary[theme.palette.mode === "light" ? "main" : "main"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.SECONDARY && {
      color:
        theme.palette.secondary[
          theme.palette.mode === "light" ? "dark" : "light"
        ],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.secondary[theme.palette.mode === "light" ? "main" : "light"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.secondary.main,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.ERROR && {
      color:
        theme.palette.error[theme.palette.mode === "light" ? "dark" : "light"],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.error[theme.palette.mode === "light" ? "main" : "main"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.error.main,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.SUCCESS && {
      color:
        theme.palette.success[
          theme.palette.mode === "light" ? "dark" : "light"
        ],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.success[theme.palette.mode === "light" ? "main" : "main"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.success.main,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.INFO && {
      color:
        theme.palette.info[theme.palette.mode === "light" ? "dark" : "light"],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.info[theme.palette.mode === "light" ? "main" : "main"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.info.main,
        theme.palette.mode === "light" ? 0.08 : 0.1,
      ),
    }),
    ...(color === LabelColor.WARNING && {
      color:
        theme.palette.warning[
          theme.palette.mode === "light" ? "dark" : "light"
        ],
      boxShadow: `0 0 0 1px inset ${alpha(theme.palette.warning[theme.palette.mode === "light" ? "main" : "main"], 0.4)}`,
      backgroundColor: alpha(
        theme.palette.warning.main,
        theme.palette.mode === "light" ? 0.02 : 0.1,
      ),
    }),
    ...(flat && {
      boxShadow: "none",
    }),
  }),
);

export function Label({
  inline = false,
  color = LabelColor.DEFAULT,
  button = false,
  flat = false,
  ...rest
}: {
  inline?: boolean;
  color?: LabelColor;
  button?: boolean;
  flat?: boolean;
  [key: string]: any;
}) {
  const theme = useTheme();
  return (
    <StyledBox
      component="span"
      color={color}
      inline={inline}
      button={button}
      theme={theme}
      flat={flat}
      {...rest}
    />
  );
}
