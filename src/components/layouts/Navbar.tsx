import React, { FC } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  alpha,
  lighten,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { NavbarMenu } from "./NavbarMenu";

const navbarContent: { href: string; children: string }[] = [];

export const Navbar: FC = () => {
  return (
    <>
      <AppBar
        variant="elevation"
        sx={{
          backgroundColor: alpha(lighten("#000", 0.1), 0.9),
          backdropFilter: "blur(10px) saturate(180%)",
        }}
        position="sticky"
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "2rem",
            }}
          >
            Better Tractive
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "block" }, mr: 5 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {navbarContent.map((item, index) => (
                <Button key={index} sx={{ fontWeight: "bold" }} color="inherit">
                  {item.children}
                </Button>
              ))}
            </Stack>
          </Box>

          <NavbarMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};
