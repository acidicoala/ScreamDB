import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocale } from "~/core/hooks/useLocale.ts";

export function PageCrash() {
  const locale = useLocale();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={2}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
      <Typography variant="h5" color="textSecondary" align="center">
        {locale.page_crash}
      </Typography>
    </Box>
  );
}
