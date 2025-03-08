import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontWeight: 600,
          textTransform: "unset",
          borderRadius: "8px",
          ...(ownerState.variant === "contained" && {
            backgroundColor: "#005bd6",
            color: "#FFFFFF",
          }),
          ...(ownerState.variant === "outlined" && {
            color: "#005bd6",
            border: "1px solid #005bd6",
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "0",
          "& .MuiInputBase-root": {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& .MuiInputBase-input": {
            padding: "14.5px 16px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "14.5px 16px",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    h2: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    h3: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    h4: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    h5: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    h6: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    subtitle1: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    subtitle2: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    body1: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    body2: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    button: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    caption: {
      lineHeight: "21px",
      fontSize: "14px",
    },
    overline: {
      lineHeight: "21px",
      fontSize: "14px",
    },
  },
});
