import React, { FC, useCallback, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  alpha,
  lighten,
  Button,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import { ExitToAppRounded } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/lib/tractive/api";
import { tractiveBaseUrl } from "@/lib/tractive/api_utils";
import { mediaProfilePath } from "@/lib/tractive/api_paths";

const navbarContent: { href: string; children: string }[] = [
  {
    href: "/",
    children: "Home",
  },
];

export const Navbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useAuth();

  const handleAvatarClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignoutClick = useCallback(() => {
    auth.signOut();
  }, [auth]);

  const { data: userData } = useSWR(
    {
      type: "user",
      userId: auth.userId,
      authToken: auth.token,
    },
    getUser,
    {
      revalidateOnFocus: false,
      refreshInterval: 1000 * 60 * 1, // 1 minute
    },
  );

  const avatarUri = useMemo(
    () =>
      userData?.profile_picture_id
        ? tractiveBaseUrl +
          mediaProfilePath(userData?._id, {
            width: 512,
            height: 512,
          })
        : null,
    [userData?._id, userData?.profile_picture_id],
  );

  const open = Boolean(anchorEl);

  return (
    <AppBar
      variant="elevation"
      sx={{
        backgroundColor: alpha(lighten("#000", 0.1), 0.9),
        backdropFilter: "blur(10px) saturate(180%)",
      }}
      position="sticky"
    >
      <Toolbar>
        <Button
          sx={{ fontWeight: "bold", fontSize: "2rem" }}
          color="inherit"
          variant="text"
          size="small"
          LinkComponent={Link}
          href="/"
        >
          Better Tractive
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "block" }, mr: 5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {navbarContent.map((item, index) => (
              <Button
                key={index}
                sx={{ fontWeight: "bold" }}
                color="inherit"
                LinkComponent={Link}
                href={item.href}
              >
                {item.children}
              </Button>
            ))}
          </Stack>
        </Box>

        {auth.isAuthenticated && avatarUri && (
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={handleAvatarClick} size="medium">
              <Image
                src={avatarUri}
                alt=""
                width={45}
                height={45}
                quality={100}
                style={{ borderRadius: "50%" }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                ml={2}
                mr={2}
                mb={1}
              >
                {userData?.details.first_name} {userData?.details.last_name}
              </Typography>

              <MenuItem onClick={handleSignoutClick}>
                <ExitToAppRounded
                  fontSize="small"
                  color="error"
                  sx={{ mr: 1, alignSelf: "center" }}
                />
                Sign out
              </MenuItem>
            </Menu>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
