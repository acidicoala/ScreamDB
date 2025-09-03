import { ImageNotSupported } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useLocale } from "~/core/hooks/useLocale.ts";

export function ImageFallback() {
  const locale = useLocale();

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <ImageNotSupported fontSize={"large"} />
      <Typography marginTop={2} color={"textDisabled"}>
        {locale.image_not_available}
      </Typography>
    </Box>
  );
}
