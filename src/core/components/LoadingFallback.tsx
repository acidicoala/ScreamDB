import { useLocale } from "~/core/hooks/useLocale.ts";
import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingFallback() {
  const locale = useLocale();

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginY={10}>
      <CircularProgress size={32} />
      <Typography variant={"h5"} marginLeft={2}>
        {locale.loading}
      </Typography>
    </Box>
  );
}
