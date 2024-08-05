import { alpha, createTheme, responsiveFontSizes } from "@mui/material";
import { muiShadows } from "./shadows";

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily:
        // eslint-disable-next-line quotes
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      body1: {
        fontSize: "16px",
        letterSpacing: "-0.05px",
      },
      body2: {
        fontSize: "12px",
        letterSpacing: "-0.04px",
      },
      h1: {
        fontWeight: 500,
        fontSize: "40px",
        letterSpacing: "-0.24px",
      },
      h2: {
        fontWeight: 500,
        fontSize: "29px",
        letterSpacing: "-0.24px",
      },
      h3: {
        fontWeight: 500,
        fontSize: "24px",
        letterSpacing: "-0.06px",
      },
      h4: {
        fontWeight: 500,
        fontSize: "20px",
        letterSpacing: "-0.06px",
      },
      h5: {
        fontWeight: 700,
        fontSize: "18px",
        letterSpacing: "-0.05px",
      },
      h6: {
        fontWeight: 700,
        fontSize: "14px",
        letterSpacing: "-0.05px",
      },
    },
    components: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundImage: "none!important",
            backdropFilter: "blur(10px) saturate(180%)",
            backgroundColor: `${alpha("#000", 0.6)}!important`,
            border: `1px solid ${alpha("#fff", 0)}`,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&:last-child": {
              paddingBottom: theme.spacing(2),
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "16px",
            textTransform: "none",
            fontWeight: "bold",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
    },
    palette: {
      mode: "dark",
      secondary: {
        main: "#e10600",
      },
    },
    shadows: muiShadows,
  }),
  { factor: 3 },
);
