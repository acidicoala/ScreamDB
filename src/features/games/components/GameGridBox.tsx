import { Box, styled } from "@mui/material";

export const GameGridBox = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "auto",
  gap: 16,
  flexWrap: "wrap",
  justifyContent: "center",
  width: "100%",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: theme.breakpoints.values.sm,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.breakpoints.values.md,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: theme.breakpoints.values.lg,
  },
}));
