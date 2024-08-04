import React from "react";
import {
  Box,
  BoxProps,
  Container,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { JSONTree } from "react-json-tree";
import { Navbar } from "./Navbar";
import { useDebug } from "@/hooks/useDebug";

interface IProps {
  title: string;
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideTitle?: boolean;
  titleVariant?: TypographyOwnProps["variant"];
  container?: boolean;
  containerProps?: BoxProps;
}

export const ContentLayout: React.FC<IProps> = ({
  title,
  children,
  hideTitle = false,
  titleVariant = "h3",
  hideNavbar = false,
  container = false,
  containerProps,
  ...props
}) => {
  const { debugState, debugData } = useDebug();

  const ContainerWrapper = container ? Container : React.Fragment;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" {...props}>
      {!hideNavbar && <Navbar />}
      <Box flexGrow={1}>
        {/* @ts-ignore */}
        <ContainerWrapper {...containerProps}>
          {!hideTitle && title && (
            <Typography
              fontWeight={800}
              variant={titleVariant}
              noWrap
              my={2}
              mx={2}
            >
              {title}
            </Typography>
          )}
          {children}
        </ContainerWrapper>

        {debugState && <JSONTree data={debugData} />}
      </Box>
    </Box>
  );
};
